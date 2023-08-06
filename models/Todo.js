const { default: mongoose } = require("mongoose");

const Todo = new mongoose.Schema({
    title:{ type:String,require:true},
    description:{ type:String,require:true},
    completed: Boolean, 
},{timestamps:true})

const Task = mongoose.model('Task',Todo);

module.exports = Task;