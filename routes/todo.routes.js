const express = require("express")
const {todoModel} = require("../model/todo.model")
const todoRouter = express.Router();

todoRouter.get("/",async (req,res) => {
    const todo = await todoModel.find()
    res.send(todo)
})

todoRouter.post("/create",async (req,res) => {
    const payload = req.body
    try{
        const new_todo = new todoModel(payload)
        await new_todo.save()
        res.send({"msg" : "data added"})
    }
    catch(error){
        console.log(error)
        res.send({"error" : "error"})
    }
})

todoRouter.patch("/update/:todoID", async (req,res) => {
        const todoID = req.params.noteID
        const userID = req.body.userID
        const todo = await todoModel.findOne({_id:todoID})
        if(userID !== todo.userID){
            res.send("not authorised")
        }
        else{
            await todoModel.findByIdAndUpdate({_id : todoID},payload)
            res.send({"msg" : "data updated"})
        }
})

todoRouter.delete("/delete/:todoID", async (req,res) => {
    const todoID = req.params.todoID
    const userID = req.body.userID
    const todo = await todoModel.findOne({_id:todoID})
    if(userID !== todo.userID){
        res.send("Not authorised")
    }
    else{
        await todoModel.findByIdAndDelete({_id : todoID})
        res.send({"msg" : "todo deleted"})
    }
})
module.exports = {todoRouter}


