const express = require("express");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todo-database-week-7-part2");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "wisemensayonlyfoolsrushin"


const bcrypt = require('bcrypt');
const {z} = require('zod');

const {UserModel, TodoModel} = require("./db")

app.use(express.json());


app.post("/signup", async function(req, res){

   //INPUT VALIDATION USING ZOD

   const requiredBody = z.object({
       email : z.string().min(3).max(100).email(),
       password : z.string().min(3).max(100),
       name : z.string().min(3).max(100),
   });

   const parsedDataWithSuccess = requiredBody.safeParse(req.body);

   if(!parsedDataWithSuccess.success){
      res.json({
          message : "Incorrect format",
          error : parsedDataWithSuccess.error
      })
   }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    //HASHING THE PASSWORD

    //Try-catch block helps us to catch the error which can lead to a server crash
    
    let errorFound = false;

    try{
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);
   

    await UserModel.create({
        email : email,
        password: hashedPassword,
        name : name
    })
} catch(e){
     res.json({
        message : "User already exists!"
     })
     errorFound = true;
}

if(!errorFound){
    res.json({
        message: "You are logged in!"
    })
}

})


app.post("/signin", async function(req, res){
     const email = req.body.email;
     const password = req.body.password;
     
     //Agar humne yahan password field bheji, toh humesha hee user =  NULL milega bcoz humara plain text password store nai hora na
     const user = await UserModel.findOne({
          email : email
     })

     //Comparing the original password sent by user to the user password we get as response
     const passwordMatch = await bcrypt.compare(password, user.password);

     if(passwordMatch){
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