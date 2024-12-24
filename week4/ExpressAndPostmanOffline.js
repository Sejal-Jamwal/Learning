
// a small in memory hospital backend functionality

//remember in memory means whenever we refresh and run our command node ExpressAndPostman.js, the previous changes are lost
// due to this reason, we use databases

const express= require("express");
const app= express();

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/", function(req, res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;

    let numberOfHealthyKidneys = 0;

    for(let i=0; i<numberOfKidneys; i++){
        if(johnKidneys[i].healthy == true){
            numberOfHealthyKidneys++;
        }
    }

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        "kidneys": johnKidneys,
        "number of kidneys": numberOfKidneys,
        "number of healthy kidneys" : numberOfHealthyKidneys,
        "number of unhealthy kidneys": numberOfUnhealthyKidneys
    });

})

//post puts new kidneys and makes healthy set to the variable isHealthy that is passed in the body of the request

app.post("/", function(req, res){
    
    let isHealthy = req.body.isHealthy;

    users[0].kidneys.push({
        healthy : isHealthy
    });

    res.json({
        "Status" : "Done!"
    });

})

//put routes updates all the kidneys with healthy as true

app.put("/", function(req, res){

     for(let i=0; i<users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true;
     }

     res.json({
        msg: "done!"
     });

})

// delete route deletes all the kidneys where healthy is false

app.delete("/", function(req, res){
      let newKidneys = [];

      for(let i=0; i<users[0].kidneys.length; i++){
          if(users[0].kidneys[i].healthy == true){
               newKidneys.push({
                   healthy : true
               });
          }
      }

      users[0].kidneys = newKidneys

      res.json({
         msg: "done"
      });
})

app.listen(3000);
