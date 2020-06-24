require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const mongoose = require('mongoose')
const md5 = require('md5');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

mongoose.connect("mongodb://localhost:27017/userDB")


const userSchema = new mongoose.Schema({
    email:string,
    password:string
});
const User = mongoose.model("User",userSchema);
const secret = process.env.SECRET;

userSchema.plugin(encrypt,{secret:secret}, {encryptedFields : ['password']});

app.post("/register",function(req,res){
    const newUser = new userSchema({
        email:(req.body.username),
        password:md5(req.body.password)
    });
    newUser.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.render("secret")
        }
    })
});

app.post("/login",function(req,res){
    const newUser = new userSchema({
        email: (req.body.username),
        password: md5(req.body.password)
    });
    User.findOne({email:username},function(err,foundUser){
        if(err){
            console.log(err)
        }else{
            if(foundUser.password===password){
                res.render("secret");
            }
        }
    });
});