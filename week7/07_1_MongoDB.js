const express = require("express");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todoDatabase");
// const { ObjectId } = require('mongodb');

const app = express();

const jwt = require("jsonwebtoken");
const JWT_SECRET = "wisemensayonlyfoolsrushin"

//importing UserModel and TodoModel from db.js file to here
const {UserModel, TodoModel} = require("./db")

app.use(express.json());


app.post("/signup", async function(req, res){

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
    //This is an async function call, and returns a promise therefore await
    //CREATE part of CRUD
    await UserModel.create({
        email : email,
        password: password,
        name : name
    })

    res.json({
        message: "You are logged in!"
    })

})


app.post("/signin", async function(req, res){
     const email = req.body.email;
     const password = req.body.password;

     const user = await UserModel.findOne({
          email : email,
          password : password
     })

     if(user && user._id){
         const token = jwt.sign({
            id: user._id.toString()
         }, JWT_SECRET);

         res.json({
            token : token
         })
     }
     else{
        res.status(403).json({
            message: "Incorrect email or password"
        })
     }
})

//AUTHENTICATION MIDDLEWARE FOR AUTHENTICATED ENDPOINTS
function auth(req, res, next){
     const token = req.headers.token;

     const decodedInfo = jwt.verify(token, JWT_SECRET);

     if(decodedInfo){
         req.id = decodedInfo.id;
         next();
     }
     else{
        res.json({
            message : "Incorrect token!"
        })
     }
}


app.post("/todos", auth,  async function(req, res){

    const title = req.body.title;
    const isDone = req.body.isDone;
    const userID = req.id;

    await TodoModel.create({
        title: title,
        done : isDone,
        userId : userID
    });
    
    res.json({
        message : "Todo created!"
    });

})



app.get("/todo", auth, async function(req, res){

    const id = req.id;

    const todos = await TodoModel.find({
        userId : id
    })
    
    res.json({
        todos : todos
    })

})

app.listen(3000);