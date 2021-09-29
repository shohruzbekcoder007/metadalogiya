const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String, 
    father_name: String, 
    position: String, 
    management: String, 
    section: String, 
    inn: {
        type: String,
        required: true
    },
    management_code: String, 
    section_code: String,
    position_code: String,
    table_number: String,
    status: {
        type: String,
        enum: ["1","2"]
    },
    code: String,
})

const User = mongoose.model("users", UserSchema);

const WorkSchema = new mongoose.Schema({
    work_text: String, 
    work_type: String, 
    start_date: {
        type: Date,
        default: new Date(),
    }, 
    finish_date: {
        type: Date,
        default: new Date(),
    }, 
    duration: String, 
    work_code: String,
    day: {
        type: Date,
        default: new Date(),
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const Work = mongoose.model("works", WorkSchema);

const AdminSchema = new mongoose.Schema({
    email: String, 
    password: String,
})

const Admin = mongoose.model("admins", AdminSchema);

module.exports.User = User;
module.exports.Work = Work;
module.exports.Admin = Admin;
