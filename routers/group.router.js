const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('./../middleware/cookieJwtAuth.middleware')

const { Group } = require('./../models/group.model')

router.get('/groups', cookieJwtAuth, async (req, res) => {
    try{
        if(req.query.region_user){
            let groups = await Group.find({region_user: req.query.region_user}).
            populate({
                path: 'town_id',
                select: '-password'
            }).select('town_id, -_id')
            return res.send(groups)
        }else{
            return res.send([])
        }
        
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

module.exports = router;