//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();
//const encrypt=require("mongoose-encryption");
const md5= require("md5");
const google=require("google");
const googleMapsClient = require('@google/maps').createClient({
  key: "AIzaSyBAGXeAn-EspVCh93GrbNbBkrxFcFCf3uU",
});
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true, useUnifiedTopology: true});

const userSchema=new mongoose.Schema({
  email:String,
  password: String
});

secret=process.env.SECRET;
api=process.env.API;
//userSchema.plugin(encrypt, {secret:secret, encryptedFields: ['password']});

const User= new mongoose.model("User",userSchema);
app.get("/",function(req,res){
  res.render("index");
});
app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  const newUser=new User({
    email:req.body.username,
    password: md5(req.body.password)
  });
  newUser.save(function(err){
    if(err)
    console.log(err);
    else
    res.render("home");
  });
});

app.get("/login",function(req,res){
  res.render("login");
});


app.post("/login",function(req,res){
  const username=req.body.username;
  const password=md5(req.body.password);


User.findOne({email:username},function(err,foundUser){
  if(err)
  console.log(err);
  else{
    if(foundUser){
      if(foundUser.password===password){
        res.render("mapsite");
        }
        else{
          res.render("error");
        }
    }
  }
})
});


app.get("/biodata",function(req,res){
  res.render("biodata");
});

app.get("/medicalStore",function(req,res){
  res.render("medicalStore");
});

app.get("/hospital",function(req,res){
  res.render("hospital");
});
app.get("/mapsite",function(req,res){
  res.render("mapsite")
});
app.get("/finalmap",function(req,res){
  res.render("finalmap")
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server has started succesfully");
});
//jshint esversion:6
