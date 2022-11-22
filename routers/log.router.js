const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('./../middleware/cookieJwtAuth.middleware')

const { Log } = require('./../models/log.model')

router.get('/', cookieJwtAuth, async (req, res) => {
    try{
        let logs = await Log.find({}).sort('-date').limit(100).populate({
            path: 'user'
        })
        if(req.user.status == 3){
            return res.render('logs', {
                name: req.user.name,
                logs: logs
            })
        } else {
            return res.send("Sizga bu sahifaga kirishga ruxsat yo'q!!!")
        }
    } catch(err) {
        return res.send("Serverda kutilmagan xatolik yuzaga keldi!!!")
    }
})

module.exports = router;