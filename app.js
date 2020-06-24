require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

mongoose.connect("mongodb://localhost:27017/userDB")


const userSchema = new mongoose.Schema({
    email:string,
    password:string
});

const secret = process.env.SECRET;

userSchema.plugin(encrypt,{secret:secret}, {encryptedFields : ['password']});