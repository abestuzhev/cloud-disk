const {Schema, model, ObjectId, models} = require("mongoose");

const File = new Schema({
    name: {type: String},
    type: {type: String},
    accessLink: {type: String},
    size: {type: Number, default: 0},
    path: {type: String, default: ""},
    user: {type: ObjectId, ref: "File"},
    parent: {type: ObjectId, ref: "File"},
    childs: [{type: ObjectId, ref: "File"}]
})

module.exports = model("File", File);