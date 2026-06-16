const mongoose=require("mongoose");
const connectionDb=require("../model/connection");
const Schema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

const userModel=mongoose.model("userModel",Schema);
module.exports=userModel;

