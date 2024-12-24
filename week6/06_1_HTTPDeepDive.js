const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();



const JWT_SECRET = "iamsejalilovefoodilovetotravel"

const users = [];



//WE DONT NEED generateToken() fn bcoz we will be using JWTs
//This generateToken fn is used when we dont use JWTs

// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }

app.use(express.json());


app.post("/signup", function(req, res){
    
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

app.post("/signin", function(req, res){
     
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
        //  We need to convert the username over to a JWT
        // const token = generateToken();

        const token = jwt.sign({
           username : user.username
        }, JWT_SECRET);
        
        //Since JWT is a stateless token, we dont have to store the token in the in memory db i.e the users array
        // user.token = token;

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

app.get("/me", function(req, res){
    const token = req.headers.token; 
    
    // gives you back the json info that you used to encode the token with along with JWT_SECRET i.e we used username in /signin endpoint therefore {username: "something"}
    const decodedInfo = jwt.verify(token, JWT_SECRET); 

    const user = users.find(function(u){
        // if(u.token == token){
        //     return true;
        // }
        // else{
        //     return false;
        // }


        //Now we will use the decodedInfo.username to find the user

        if(u.username == decodedInfo.username){
            return true;
        }
        else{
            return false;
        }
    })

    if(user){
        res.json({
            username : user.username,
            password : user.password
        })
    }
    else{
        res.json({
            msg: "incorrect token!"
        })
    }
})

app.listen(3000);