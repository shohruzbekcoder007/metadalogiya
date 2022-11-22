const upload_file = require('../middleware/file_upload.middleware')
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const Grid = require('gridfs-stream')
const { Task } = require('./../models/task.model')
const creatr_log = require('../log/create_log')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth.middleware')

let gfs;
const conn = mongoose.connection

let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "files"
  });
});

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('files')
    console.log("connection made successfully")
})

router.post('/uploadfile', [cookieJwtAuth, upload_file.single('file')], async (req, res) => {

    if(req.file === undefined) return res.send("file tanlang")

    const imageUrl = `http://localhost:8000/file/${req.file.filename}`

    if(req.query.task_id)
        await Task.findOneAndUpdate({_id: req.query.task_id}, {$set: {task_status: 2, file_url: imageUrl}})
    
    creatr_log(req.user._id, `Fayil biriktirildi va tekshirishga o'tkazildi (file: ${imageUrl})!!!`)

    return res.send(imageUrl)
    
});

router.get('/:filename', async (req, res) => {
    try{
        const file = await gfs.files.findOne({filename: req.params.filename})
        const readStream = bucket.openDownloadStream(file._id)
        readStream.pipe(res)
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.put('/updatewithtask', cookieJwtAuth, async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.body._id})
        const file_url = task.file_url
        console.log(file_url)
        await gfs.files.deleteOne({filename: file_url})
        let doc = await Task.findOneAndUpdate({_id: req.body._id}, {
            file_url: "",
            task_status: 1
        }, { new: true });
        console.log("<|||||||>")
        if(doc && doc.file_url == "" && doc.task_status == 1){
            return res.send({ok: true});
        }else{
            return res.status(400).send({ok: false});
        }
    } catch (error) {
        console.log("sho'tta")
        return res.status(400).send({ok: false});
    }
})

module.exports = router;