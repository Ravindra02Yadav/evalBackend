const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const cors = require("cors")

const {connection} = require("./config/database")
const {userModel} = require("./model/user.model")
const {todoRouter} = require("./routes/todo.routes");
const { auth } = require("./middleware/auth");
app.use(express.json())
app.use(cors({
    origin : "*"
}))

app.get("/", (req, res) => {
    res.send("Welcome")
})
app.post("/signup", async (req,res) =>{
    console.log(req.body)
    const {email,password} = req.body;
    const isUser = await userModel.findOne({email})
    if(isUser?.email){
        res.send("login again user exist")
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err,hash) {
                const user = new userModel({email,password:hash})
                await user.save()
                res.send("sign up successfull")
            });
           
        }
       catch(err){
            console.log(err)
            res.send("error in login")
        }
    }
    
})
app.post("/login", async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.find({email})  
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'hush');
                res.send({"msg":"login successfull","token" :token})
            }
            else{
                res.send("unable to login")
 }
      })} 
      else{
        res.send("unable to login")
      }
    }
    catch{
        res.send("error in login")
    }
})
app.get("/about", (req,res) => {
    res.send("About")
})

app.use(auth)
app.use("/todo",todoRouter)

app.listen(process.env.port, async () => {
    try{
        await connection;
        console.log("connected to DB successfully")
    }
    catch(err){
        console.log("error connecting to DB")
        console.log(err)
    }
    console.log("listening on port 8520")
})