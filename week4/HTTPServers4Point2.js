const express = require('express')
const app = express() 

function sum(n){
   let sum=0;
   
   for(let i=0; i<=n; i++){
      sum=sum+i;
   }

   return sum;
}

//route handler for '/' endpoint
app.get('/', function (req, res) { //whenever a http get request comes on the '/' route, please run the code on line 6
  
    //req object=> also called request object, will give you all things related to the request object
    //res object=> also called response object, will give you all thing related to the response object

    const n=req.query.n;
    const ans=sum(n);

    res.send("hi there your answer is " + ans);
})

//route handler for '/asd' endpoint
app.get('/asd', function (req, res) { //whenever a http get request comes on the '/asd' route, please run the code on line 11
    res.send('Hello World from asd endpoint')
  })


app.listen(3000) //this is the port you want to listen on

//code on line 9 also makes sure that the process runs infinitely..why do u want to run it infinitely? =>bcoz it is an http server! 
 