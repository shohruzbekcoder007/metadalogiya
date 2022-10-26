const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { cookieJwtAuth } = require('./../middleware/cookieJwtAuth.middleware')

const { Task } = require('./../models/task.model')

router.post('/rep', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 || user.status == 2){

            let task = new Task({
                user_id: req.body.user_id,
                text: req.body.text,
                date_month: req.body.date_month,
                date_year: req.body.date_year,
                task_status: 1
            })
            let new_task = await task.save()

            if(new_task)
                return res.render("main_admin", {
                    task: new_task,
                    name: user.name,
                    user_id: new_task.user_id
                })
            else 
                return res.send("Tizimda xatolik yuzaga keldi")

        }

    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/rep', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 || user.status == 2)
            return res.render("main_admin", {
                name: user.name
            })
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.post('/region', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 || user.status == 2){

            let task = new Task({
                user_id: req.body.user_id,
                text: req.body.text,
                date_month: req.body.date_month,
                date_year: req.body.date_year,
                task_status: 1
            })
            let new_task = await task.save()

            if(new_task)
                return res.render("main_admin1", {
                    task: new_task
                })
            else 
                return res.send("Tizimda xatolik yuzaga keldi")

        }

    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/region', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 || user.status == 2)
            return res.render("main_admin1", {
                name: user.name
            })
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.post('/town', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 || user.status == 2){

            let task = new Task({
                user_id: req.body.user_id,
                text: req.body.text,
                date_month: req.body.date_month,
                date_year: req.body.date_year,
                task_status: 1
            })
            let new_task = await task.save()

            if(new_task)
                return res.render("main_admin2", {
                    task: new_task,
                    name: user.name
                })
            else 
                return res.send("Tizimda xatolik yuzaga keldi")

        }

    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/town', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 || user.status == 2)
            return res.render("main_admin2", {
                name: user.name
            })
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/check', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 || user.status == 2)
            return res.render("check", {
                name: user.name
            })
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/checkone', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 || user.status == 2)
            return res.render("check1", {
                name: user.name
            })
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/checktwo', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 || user.status == 2)
            return res.render("check2", {
                name: user.name
            })
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/taskone', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 1){
            let my_tasks = await Task.find({ user_id: user._id, task_status: 1 });
            return res.render("main", {
                tasks: my_tasks,
                name: user.name
            })
        }
            
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/tasktwo', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 1){
            let my_tasks = await Task.find({ user_id: user._id, task_status: 2 });
            return res.render("main1", {
                tasks: my_tasks,
                name: user.name
            })
        }
            
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/taskthree', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 1){
            let my_tasks = await Task.find({ user_id: user._id, task_status: 3 });
            return res.render("main2", {
                tasks: my_tasks,
                name: user.name
            })
        }
            
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/taskfour', cookieJwtAuth,  async (req, res) => {

    try{
        const user = req.user
        if(user.status == 1){
            let my_tasks = await Task.find({ $and: [ {"date_year": {$gte: new Date().getFullYear()}}, {"date_month": {$lt: new Date().getFullYear()}}, {task_status: 1}, {user_id: user._id} ]})
            return res.render("main3", {
                tasks: my_tasks,
                name: user.name
            })
        }
            
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})
 
router.get('/checktaskone', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        const { user_id, status } = req.query
        if(user.status == 2 || user.status == 3){
            if(status == 4){
                let my_tasks = await Task.find({ $and: [ {"date_year": {$gte: new Date().getFullYear()}}, {"date_month": {$lt: new Date().getFullYear()}}, {task_status: 1}, {user_id: user_id} ]})
                return res.send(my_tasks)
            } else {
                let my_tasks = await Task.find({ user_id: user_id, task_status: status })
                return res.send(my_tasks)
            }
        }
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.post('/chackestatustwo', cookieJwtAuth, async (req, res) => {
    try{
        const taskwithotherstatus = await Task.findOneAndUpdate({_id: req.body._id}, {$set: {task_status: 3}}, {new: true})
        return res.send(taskwithotherstatus)
    }catch(err){
        return res.send({})
    }
})

router.get('/tasks', async (req, res) => {
    try {
        let tasks = []
        if(req.query.user_id){
            tasks = await Task.find({user_id: req.query.user_id}).sort({ created_at: -1 }).populate({
                path: 'user_id',
                select: '-password'
            })
        }
        return res.send(tasks)
    } catch(err) {
        return res.send([])
    }
})

router.delete('/delete', cookieJwtAuth, async (req, res) => {
    let user = await Task.findByIdAndRemove(req.query.id);
    if (!user)
        return res.status(400).send({ok: false});

    return res.send({ok: true});
})

module.exports = router;