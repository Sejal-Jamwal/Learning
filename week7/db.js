const mongoose = require("mongoose");

const Schema = mongoose.Schema; //mongoose library exports a class called Schema which we save in the const variable named Schema
const ObjectId = mongoose.ObjectId; 

//Creating a User instance which will define how the User schema will look like

const User = new Schema({
     email: {type : String, unique : true},
     password: String,
     name: String
})

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})

//Data models where users and todos are collections and User and Todo is the schema of the data that is 
// going into these collections respectively.

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

//Exporting in Javascript
//Exporting the UserModel and TodoModel so that it can be imported in 07_1_MongoDB.js

module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
}



