const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    region_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    town_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
});

const Group = mongoose.model("groups", GroupSchema)
module.exports.Group = Group