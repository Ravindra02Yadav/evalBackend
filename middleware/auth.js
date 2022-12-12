const jwt = require("jsonwebtoken")
const {TodoModel} = require("./model/todo.model")

const auth = (req,res,next) => {
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token, 'hush')
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }
        else{
            res.send("login first")
        }  
    }
    else{
        res.send("login first")
    }
}
const getData = async (req,res) => {
    const todo = await TodoModel.find();
    res.send(todo);
}

const createData = (req,res) => {
    const { text } = req.body;
    todoModel
        .create({text})
        .then(() => res.set(201).send("feched data"))
        .catch((error) => console.log(error));
}

const deleteData = (req,res) => {
    const {_id} = req.body;
    todoModel
        .findByIdAndDelete(_id)
        .then(() => res.set(201).send("deleted"))
        .catch((error) => console.log(error));
}

const updateData = (req,res) => {
    const { _id, text } = req.body;
    todoModel
        .findByIdAndUpdate(_id, { text })
        .then(() =>res.set(201).send("updated"))
        .catch((error) => console.log(error));
}
module.exports = {auth,getData,deleteData,updateData,createData}