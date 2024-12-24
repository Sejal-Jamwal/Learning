const express = require('express')
const app = express();

//CHAPTER 1: THIS IS HOW NORMALLY WE PUT A CHECK ON AGE

// FUNCTION THAT CHECKS THE AGE OF THE PERSON(THE TICKET CHECKER)
// function isOldEnough(age){
//     if(age>=15){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

// MAKING A ROUTE HANDLER FOR ROUTE "/ride1"
// app.get("/ride1", function(req, res){

//     if(isOldEnough(req.query.age)){
//       res.json({
//         msg : "you have successfully ridden ride 1"
//      })
//    }
//   else{
//      res.status(411).json({
//         msg: "you are less than 15 years of age"
//      });
//   }
// })

// MAKING A ROUTE HANDLER FOR ROUTE "/ride2"
// app.get("/ride2", function(req, res){
//      if(isOldEnough(req.query.age)){
//          res.json({
//             msg : "you have successfully ridden ride 2"
//          })
//      }
//      else{
//         res.status(411).json({
//             msg : "you are less than 15 years of age"
//         });
//      }
// })



// CHAPTER 2: THIS IS HOW WE USE MIDDLEWARES TO PUT A CHECK ON AGE

function isOldEnoughMiddleware(req, res, next){
      const age = req.query.age;

      if(age >= 15){
         next();
      }
      else{
         res.json({
            msg: "you are less than 15 years of age"
         });
      }
}

app.get("/ride1", isOldEnoughMiddleware, function(req, res){
     res.json({
         msg : "you have successfully ridden ride 1"
     });
})

app.get("/ride2", isOldEnoughMiddleware, function(req, res){
     res.json({
         msg : "you have successfully ridden ride 2"
     });
})

app.listen(3000);



// CHAPTER 3: IF A COMMON MIDDLEWARE FUNCTION NEEDS TO BE USED IN EVERY ROUTE

// You saw above that isOldEnoughMiddleware function was being used in both the routes /ride1 and /ride2, instead of using it in them
// we could just remove them from there and put them above both the routes by using this:
// app.use(isOldEnoughMiddleware);
// this app.use is applicable only for the routes written below it i.e order matters
// if you write /ride1 route handler then app.use then /ride2 handler => middleware function will be applied only to /ride2 handler
// if you write /ride1 route handler then /ride2 route handler then app.use =>ṁiddleware function will not be applied to any handler, bcoz none of them are written below



// CHAPTER 4: COHORT 2 ASSIGNMENT SOLVING OF MIDDLEWARES


// CHAPTER 5: UNDERSTANDING THE ERROR HANDLING MIDDLEWARE
// https://medium.com/@arunchaitanya/understanding-normal-middleware-and-error-handling-middleware-in-express-js-d3ecbd9b9849#:~:text=Normal%20middleware%20processes%20regular%20requests,executed%20when%20an%20error%20occurs.

