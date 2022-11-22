const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    text: {
        type: String,
        unique: false,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    task_status: {
        type: Number,
        enum: [1,2,3,4],
        default: 1
    },
    date_day: {
        type: Number,
        required: true
    },
    date_month: {
        type: Number,
        required: true
    },
    date_year: {
        type: Number,
        required: true
    },
    file_url: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

const Task = mongoose.model("tasks", TaskSchema);
module.exports.Task = Task;