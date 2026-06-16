const express=require("express");
const app=express();
const ejsMate=require("ejs-mate");
app.set("view engine","ejs");
const path= require("path");
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);
const mongoose=require("mongoose"); 
const connectionDb=require("./model/connection");
const userModel=require("./model/user");
connectionDb();

let port=8080;

app.get("/",(req,res)=>{ // Route Route: 
    res.render("listings/index");
})

app.get("/login",(req,res)=>{
    res.send("Login");
})
app.get("/signup",(req,res)=>{
    res.send("Signup");
})

app.listen(port,()=>{
    console.log("Work");
})