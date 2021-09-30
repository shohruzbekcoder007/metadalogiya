const express = require('express');
const router = express.Router();
// const PDFDocument = require('pdfkit');
const PdfkitConstruct = require('pdfkit-construct');
// const fs = require('fs');

const collections = require('./schema');

const { User, Work } = collections;

router.get('/',(req,res) =>{
    res.render('login', {
        
    });
});

router.get('/employee',async (req,res) =>{
    let user = await User.findOne({
        inn: req.query.name,
        code: req.query.code
    });
    
    if(user == [] || user == null){
        res.render('login', {
            
        });
    } else {
        if(user.status == 1){
            let works = await Work.find({
                employee_id: user.id,
            });
            let day_works = works.filter(elem =>{
                if(new Date(elem.day).getUTCDate() == new Date().getUTCDate() && new Date(elem.day).getUTCMonth() == new Date().getUTCMonth() && new Date(elem.day).getUTCFullYear() == new Date().getUTCFullYear()){
                    return true;
                }else{
                    return false;
                }
            });
            type_minuts={
                type1: 0,
                type2: 0,
                type3: 0,
                type4: 0,
                type5: 0,
                type6: 0
            }
            day_works.forEach(element => {
                if(element.work_type == 1){
                    if (!isNaN(parseInt(element.duration))) {
                        type_minuts.type1 = type_minuts.type1 + parseInt(element.duration);
                    }
                }
                if(element.work_type == 2){
                    if (!isNaN(parseInt(element.duration))) {
                        type_minuts.type2 = type_minuts.type1 + parseInt(element.duration);
                    }
                }
                if(element.work_type == 3){
                    if (!isNaN(parseInt(element.duration))) {
                        type_minuts.type3 = type_minuts.type1 + parseInt(element.duration);
                    }
                }
                if(element.work_type == 4){
                    if (!isNaN(parseInt(element.duration))) {
                        type_minuts.type4 = type_minuts.type1 + parseInt(element.duration);
                    }
                }
                if(element.work_type == 5){
                    if (!isNaN(parseInt(element.duration))) {
                        type_minuts.type5 = type_minuts.type1 + parseInt(element.duration);
                    }
                }
                if(element.work_type == 6){
                    if (!isNaN(parseInt(element.duration))) {
                        type_minuts.type6 = type_minuts.type1 + parseInt(element.duration);
                    }
                }
            });
    
            res.render('main', {
                user: user ,
                works: day_works,
                type_minuts: type_minuts
            });
        } else {
            res.render('inspector', {
                
            });
        }
    }
    
});

router.post('/employee/add_work',async (req,res) =>{
    let query = req.query;
    if(
        query.work_text != "",
        query.work_type != "",
        query.start_date != "",
        query.finish_date != "",
        query.duration != "",
        query.work_code != "",
        query.id != ""
    ){
        let body = {
            work_text: query.work_text,
            work_type: query.work_type,
            start_date: new Date(query.start_date),
            finish_date: new Date(query.finish_date),
            duration: query.duration,
            work_code: query.work_code,
            employee_id: query.id,
            day: new Date(),
        }
        const work = new Work(body);
        work.save((err)=>{
            if(err){
                res.send({
                    saqlandi: false
                })
            }else{
                res.send({
                    saqlandi: true,
                    data: req.query
                }) 
            }
        })
    }else{
        res.send({
            saqlandi: false
        });
    }  
});

router.post('/employee/edit_work',async (req,res) =>{
    let query = req.query;
    if(query.id != "" && query.duration != "" && query.finish_date != "" && query.start_date != "" && query.work_code != "" && query.work_text != "" && query.work_type != ""){
        let respons = await Work.updateOne({_id : query.id}, {$set:  {
            work_code: query.work_code,
            work_text: query.work_text,
            work_type: query.work_type,
            start_date: query.start_date,
            finish_date: query.finish_date,
            duration: query.duration
        }});
        if(respons.ok == 1){
            res.send({
                saqlandi: true
            })
        }else{
            res.send({
                saqlandi: false
            })
        }
    } else {
        res.send({
            saqlandi: false
        })
    }
    
});

router.post('/employee/search_worker',async (req,res) =>{
    let query = req.query;
    let startDate;
    let endDate;
    if (query.dayinput == "") {
        startDate = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
        endDate = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() + 1);
    } else {
        startDate = new Date(new Date(query.dayinput).getUTCFullYear(), new Date(query.dayinput).getUTCMonth(), new Date(query.dayinput).getUTCDate());
        endDate = new Date(new Date(query.dayinput).getUTCFullYear(), new Date(query.dayinput).getUTCMonth(), new Date(query.dayinput).getUTCDate() + 1);
    }

    let userFined = {};
    if(req.query.inn != ""){
        userFined.inn = req.query.inn;
    }
    if (req.query.management != "") {
        userFined.management_code = req.query.management;
    }
    if (req.query.section != "") {
        userFined.section_code = req.query.section;
    }
    let user = await User.find(userFined);

    res.send({
        javob: {
            user: user,
            date: query.dayinput
        }
    })
});

router.get('/user_change',async (req,res) => {
    let query = req.query;

    let user = await User.findOne({
        _id: query.user_id
    });

    let works = await Work.find({
        employee_id: user.id,
    });

    let day_works = works.filter(elem =>{
        if(new Date(elem.day).getUTCDate() == new Date(query.date).getUTCDate() && new Date(elem.day).getUTCMonth() == new Date(query.date).getUTCMonth() && new Date(elem.day).getUTCFullYear() == new Date(query.date).getUTCFullYear()){
            return true;
        }else{
            return false;
        }
    });

    type_minuts={
        type1: 0,
        type2: 0,
        type3: 0,
        type4: 0,
        type5: 0,
        type6: 0
    }

    day_works.forEach(element => {
        if(element.work_type == 1){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type1 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 2){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type2 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 3){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type3 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 4){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type4 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 5){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type5 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 6){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type6 = type_minuts.type1 + parseInt(element.duration);
            }
        }
    });

    res.render('check_employee', {
        user: user ,
        works: day_works,
        type_minuts: type_minuts,
        query: query,
    });
});

router.get("/download_pdf", async (req, res) => {
    let query = req.query;

    let user = await User.findOne({
        _id: query.user_id
    });

    let works = await Work.find({
        employee_id: user.id,
    });

    let day_works = works.filter(elem =>{
        if(new Date(elem.day).getUTCDate() == new Date(query.date).getUTCDate() && new Date(elem.day).getUTCMonth() == new Date(query.date).getUTCMonth() && new Date(elem.day).getUTCFullYear() == new Date(query.date).getUTCFullYear()){
            return true;
        }else{
            return false;
        }
    });

    type_minuts={
        type1: 0,
        type2: 0,
        type3: 0,
        type4: 0,
        type5: 0,
        type6: 0
    }

    day_works.forEach(element => {
        if(element.work_type == 1){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type1 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 2){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type2 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 3){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type3 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 4){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type4 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 5){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type5 = type_minuts.type1 + parseInt(element.duration);
            }
        }
        if(element.work_type == 6){
            if (!isNaN(parseInt(element.duration))) {
                type_minuts.type6 = type_minuts.type1 + parseInt(element.duration);
            }
        }
    });
    let products = []
    
    for(let i = 0; i < day_works.length; i ++){
        let type_work = "";
        if(day_works[i].work_type == 1){
            type_work = "Tayyorgarlik va yakuniy"
        }
        if(day_works[i].work_type == 2){
            type_work = "Ish joyiga xizmat ko'rsatish"
        }
        if(day_works[i].work_type == 3){
            type_work = "Statistik ishlarning bajarilishi"
        }
        if(day_works[i].work_type == 4){
            type_work = "Reglamentlangan tanafus"
        }
        if(day_works[i].work_type == 5){
            type_work = "Qisqa tanafus"
        }
        if(day_works[i].work_type == 6){
            type_work = "Boshqa funksialar"
        }
        products[i]={
            work_text: ""+day_works[i].work_text,
            // work_type: ""+type_work,
            work_type: ""+day_works[i].work_type,
            id: ""+day_works[i]._id,
            start_date: ""+new Date(day_works[i].start_date).getHours() + ":" +new Date(day_works[i].start_date).getMinutes(),
            finish_date: ""+new Date(day_works[i].finish_date).getHours() + ":" +new Date(day_works[i].finish_date).getMinutes(),
            duration: ""+day_works[i].duration,
            work_code: ""+day_works[i].work_code,
        };
    }
    
    const doc = new PdfkitConstruct({
        size: 'A4',
        margins: {top: 20, left: 0, right: 0, bottom: 20},
        bufferPages: true,
    });
    doc.setDocumentHeader({}, () => {
        doc.lineJoin('miter')
            .rect(0, 0, doc.page.height - 40, doc.header.options.heightNumber + 15).fill("#ededed");

        doc.fill("#115dc8")
            .fontSize(12)
            .text("    " + user.first_name  + " " + user.last_name + " " + user.father_name + ". Tabel raqami: " + (user.table_number || user.inn), doc.header.x, doc.header.y)
            .text("    " + user.management  + ". Kod: " + user.management_code , doc.header.x, doc.header.y + 15)
            .text("    " + user.section  + ". Kod: " + user.section_code, doc.header.x, doc.header.y + 29)
            .text("    Lavozim: " + user.position  + ". Kod: " + user.position_code, doc.header.x, doc.header.y + 42)
    });

    if(products.length != 0){
        doc
        // .rotate(90,{ origin: [270,290] })
        .addTable(
        [
            {key: 'work_text', label: 'Amallar', align: 'left'},
            {key: 'work_type', label: 'Vazifa turi', align: 'right'},
            {key: 'start_date', label: 'Boshlanish vaqti', align: 'right'},
            {key: 'finish_date', label: 'Tugash vaqti', align: 'right'},
            {key: 'duration', label: 'Davomiyligi (daqiqa)', align: 'right'},
            {key: 'work_code', label: 'Ish kodi', align: 'right'}
        ],
        products, {
            border: null,
            width: "fill_body",
            striped: true,
            stripedColors: ["#f6f6f6", "#d6c4dd"],
            cellsPadding: 10,
            marginLeft: 45,
            marginRight: 45,
            headAlign: 'center'
        });
    }else{
        doc
        // .fill("#115dc8")
        .fontSize(12)
        .text("    Bu sana uchun xodimning bajargan ishlari haqida malumotlar yo'q", 0)
    }   

    doc.render();

    doc
    .fill("#115dc8")
    .fontSize(12)
    .text("    Bajaruvchining imzosi:   _________________________", 0, doc.y+50)

    doc
    .fill("#115dc8")
    .fontSize(12)
    .text("    Tarkibiy bo'linma rahbarining imzosi:   _________________________", 0, doc.y+30)

    doc
    .fill("#115dc8")
    .fontSize(12)
    .text("    Ishchi guruh azosi, tekshiruvchi(FISH):   ________________________________________________", 0, doc.y+30)
    
    doc
    .fill("#115dc8")
    .fontSize(12)
    .text("    Anketa to'ldirilishi(imzo):   _________________________", 0, doc.y+30)
    
    doc
    .fill("#115dc8")
    .fontSize(12)
    .text(`    Sana:    ${new Date(query.date).getUTCDay()}/${new Date(query.date).getUTCMonth()}/${new Date(query.date).getUTCFullYear()}`, 0, doc.y+30)

    doc.pipe(res);
    doc.end();
});

router.get("/new_password", async (req, res) => {
    let user = await User.findOne({
        inn: req.query.name,
        code: req.query.code
    });
    if(user == [] || user == null){
        res.render('update_password', {
            
        });
    } else {
        if(req.query.new_code != ""){
            let respons = await User.updateOne({_id : user._id}, {$set:  {
                code: req.query.new_code
            }});
            if(respons.ok == 1){
                res.render('login', {
            
                });
            }else{
                res.render('update_password', {
                
                });
            }
        }
        res.render('update_password', {
            
        });
    }
})

module.exports = router;