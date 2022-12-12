
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    taskname : String,
    status : false,
    tag:String
})

const TodoModel = mongoose.model("todo", userSchema)
module.exports = {TodoModel}