const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const { cookieJwtAuth } = require('./../middleware/cookieJwtAuth.middleware')
const creatr_log = require('../log/create_log')

const { User } = require('./../models/user.model')
const { Task } = require('./../models/task.model')
const { Group } = require('./../models/group.model')

router.post('/',  async (req, res) => {
    try{

        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)

        let user = new User(req.body)
        let new_user = await user.save()

        return res.send(_.pick(new_user, ['_id', 'name']))

    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
    
})

router.post('/login', async (req, res) => {

    let user = await User.findOne({ user_name: req.body.name });
    if (!user)
        return res.render('login', {
            message: 'Email yoki parol noto\'g\'ri'
        })

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword)
        return res.render('login', {
            message: 'Email yoki parol noto\'g\'ri'
        })

    const token = user.generateAuthToken();
    res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        // maxAge: 1000000,
        // signed: true
    })

    creatr_log(user._id, `(${user.name}) saytga kirdi`)
    if (user.status == 1){
        let my_tasks = await Task.find({ user_id: user._id, task_status: 1 });
        return res.render("main", {
            tasks: my_tasks,
            name: user.name
        })
    }
    

    if (user.status == 2)
        return res.render("main_admin", {
            name: user.name
        })
            
    
    if (user.status == 3)
        return res.render("main_super_admin", {
            name: user.name
        })

    return res.render('login', {})

})

router.get('/users', cookieJwtAuth,  async (req, res) => {

    const user = req.user

    try{
        if(user.status == 2 || user.status == 3){
            const status = req.query.status;
            const group = req.query.group;
            
            let users = await User.find({status: status, group: group}).select('-password')
            return res.send(users)

        } else {
            return res.send([])
        }
    }
    catch(err){
        return res.send("Tizimda xatolik yuzaga keldi")
    }
    
})

router.put('/update', cookieJwtAuth, async (req, res) => {
    
    if(!req.body._id){
        return res.send("No such user exists")
    }

    const _id = req.body._id

    let updateDate = {}

    if(req.body.user_name){
        updateDate.user_name = req.body.user_name
    }

    if(req.body.name){
        updateDate.name = req.body.name
    }

    if(req.body.password){
        const salt = await bcrypt.genSalt();
        updateDate.password = await bcrypt.hash(req.body.password, salt);
    }
    
    let user = await User.findByIdAndUpdate(_id, updateDate);
    if (!user)
        return res.status(400).send('User\'s information is not update');

    creatr_log(req.user._id, `(${user.name}) malumotlari o'zgartirildi`)
    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(_.pick(user, ['_id']));
})

router.put('/updatewithgroup', cookieJwtAuth, async (req, res) => {
    
    if(!req.body._id){
        return res.send("No such user exists")
    }

    const _id = req.body._id

    let updateDate = {}

    if(req.body.user_name){
        updateDate.user_name = req.body.user_name
    }

    if(req.body.name){
        updateDate.name = req.body.name
    }

    if(req.body.password){
        const salt = await bcrypt.genSalt();
        updateDate.password = await bcrypt.hash(req.body.password, salt);
    }
    
    let user = await User.findByIdAndUpdate(_id, updateDate);
    if (!user && req.body.region_user)
        return res.status(400).send('User\'s information is not update');

    let group = await Group.findOneAndUpdate({town_id: _id}, {region_user: req.body.region_user}, {new: true});
    if (!group)
        return res.status(400).send('Group\'s information is not update');

    creatr_log(req.user._id, `(${user.name}) malumotlari o'zgartirildi`)
    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).send(_.pick(user, ['_id']));
})

router.delete('/delete', cookieJwtAuth, async (req, res) => {
    let user = await User.findByIdAndRemove(req.query.id);
    if (!user)
        return res.status(400).send({ok: false});

    creatr_log(req.user._id, `(${user.name}) o'chirildi`)
    return res.send({ok: true});
})

module.exports = router;