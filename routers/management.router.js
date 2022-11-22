const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const { cookieJwtAuth } = require('./../middleware/cookieJwtAuth.middleware')

const { User } = require('./../models/user.model')
const { Group } = require('./../models/group.model')
const creatr_log = require('../log/create_log')

router.post('/rep', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3){

            const salt = await bcrypt.genSalt()
            req.body.password = await bcrypt.hash(req.body.password, salt)

            let user = new User({
                user_name: req.body.user_name,
                name: req.body.name,
                password: req.body.password,
                status: 1,
                group: 1
            })
            let new_user = await user.save()

            await creatr_log(req.user._id, `Yangi foydalanuvchi yaratildi(Qo'mita boshqarmasi, name: ${new_user.name})!!!`)

            return res.render("main_super_admin", {
                new_user: _.pick(new_user, ['_id', 'name', "user_name"]),
                name: user.name
            })
        }

    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/rep', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3){
            return res.render("main_super_admin", {
                name: user.name
            })
        }
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.post('/region', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3){

            const salt = await bcrypt.genSalt()
            req.body.password = await bcrypt.hash(req.body.password, salt)

            let user = new User({
                user_name: req.body.user_name,
                name: req.body.name,
                password: req.body.password,
                status: 1,
                group: 2
            })
            let new_user = await user.save()

            await creatr_log(req.user._id, `Yangi foydalanuvchi yaratildi(Hududiy boshqarma, name: ${new_user.name})!!!`)

            return res.render("main_super_admin1", {
                new_user: _.pick(new_user, ['_id', 'name', "user_name"]),
                name: user.name
            })
        }

    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/region', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3){
            return res.render("main_super_admin1", {
                name: user.name
            })
        }
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.post('/town', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3 && req.body.region_user){
            
            const salt = await bcrypt.genSalt()
            req.body.password = await bcrypt.hash(req.body.password, salt)

            let user = new User({
                user_name: req.body.user_name,
                name: req.body.name,
                password: req.body.password,
                status: 1,
                group: 3
            })

            let new_user = await user.save()

            let group = new Group({
                region_user: req.body.region_user,
                town_id: new_user._id
            })

            let new_group = await group.save()

            await creatr_log(req.user._id, `Yangi foydalanuvchi yaratildi(Hududiy bo'lim, name: ${new_user.name})!!!`)

            return res.render("main_super_admin2", {
                new_user: _.pick(new_user, ['_id', 'name', "user_name"]),
                new_group: new_group,
                name: user.name
            })
        }

    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

router.get('/town', cookieJwtAuth,  async (req, res) => {
    try{
        const user = req.user
        if(user.status == 3){
            return res.render("main_super_admin2", {
                name: user.name
            })
        }
    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
})

module.exports = router;