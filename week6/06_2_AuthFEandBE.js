const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();



const JWT_SECRET = "iamsejalilovefoodilovetotravel"

const users = [];

app.use(express.json());
//WHENEVER SOMEONE COMES ON localhost:3000, we are able to send the contents of index.html
// THIS IS DONE TO AVOID THE cors error

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
})

//CEATING A LOGGER MIDDLEWARE

function logger(req, res, next){
    console.log(req.method + " request came");
    next();
}

//CREATING AN AUTH MIDDLEWARE 
function auth(req, res, next){
   
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, JWT_SECRET);

    if(decodedInfo.username){

        //WE CHANGE THE REQUEST OBJECT TO SEND THE USERNAME WE GET BACK
        req.username = decodedInfo.username;
        next();

    }
    else{
        res.json({
            msg : "Incorrect token! No username corresponding to this token"
        })
    }
}


app.post("/signup", logger, function(req, res){
    
    const username = req.body.username;
    const password = req.body.password;

    users.push({
         username: username,
         password: password
    })
   
    res.json({
        msg: "You have successfully signed up!"
    })

    console.log(users);

});



app.post("/signin", logger, function(req, res){
     
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(function(u){
        if(u.username==username && u.password==password){
            return true;
        }
        else{
            return false;
        }
    })

    if(user){
    
        const token = jwt.sign({
           username : user.username
        }, JWT_SECRET);
            
        res.json({
            "token": token
        })
    }
    else{
        res.status(403).send({
           message: "Invalid username or password"
        })
    }
});




app.get("/me", logger, auth, function(req, res){

    const user = users.find(function(u){
       
        if(u.username == req.username){
            return true;
        }
        else{
            return false;
        }
    })

    
     res.json({
        username : user.username,
        password : user.password
    })
    
})

app.listen(3000);