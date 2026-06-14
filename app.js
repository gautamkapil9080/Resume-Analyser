const express=require("express");
const app=express();
app.set("view engine","ejs");
const path= require("path");
app.use(express.static(path.join(__dirname, "public")));

let port=8080;

app.get("/",(req,res)=>{
    res.render("one");
})

app.listen(port,()=>{
    console.log("Work");
})