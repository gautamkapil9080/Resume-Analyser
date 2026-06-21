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
const bcrypt=require("bcrypt");
const session=require("express-session");
connectionDb();
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:"mySuperSecretKey2026"
}));

let port=8080;

app.get("/",(req,res)=>{ // Route Route: 
    res.render("listings/index");
})
app.get("/temp",(req,res)=>{
    if(req.session.userId){
        res.send("Can access");
    }
    else{
        res.redirect("/login");
    }
    console.log(req.session.userId);
})

app.get("/login",(req,res)=>{
    res.render("listings/login");
})
app.post("/login/submmit",async (req,res)=>{
    const  {email,password}=req.body;
    const passwordDb=await userModel.findOne({
        email:email
    });
    const passwordfromDb=passwordDb.password;
    const answer=await bcrypt.compare(password,passwordfromDb);
    if(answer){
        req.session.userId=passwordDb._id;
        res.send("Login");
        // console.log(req.session.userid);
    }
    else{
        res.send("Failed again");
    }
});

app.get("/signup",(req,res)=>{
    res.render("listings/create");
})
app.post('/signup/submmit',async (req,res)=>{
        const  {userName,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new userModel({        // Documetns
        userName:userName,
        password:hashedPassword,
        email:email
    })
    await user.save(user);
    console.log(user);
    res.send("Saved")
})

app.get("/logout",(req,res)=>{
    if(req.session.userId){
         req.session.userId=null;
    res.send("Succesfully Logout")
    }
    else{
        res.send("You have already Logout");
    }
   
})

app.listen(port,()=>{
    console.log("Work");
})