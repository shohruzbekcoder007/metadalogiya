const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    date: {
        type: Date,
        default: new Date()
    },
    information: {
        type: String,
        default: ""
    }
});

const Log = mongoose.model("logs", LogSchema)
module.exports.Log = Log