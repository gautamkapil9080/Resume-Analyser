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
const multer=require('multer');
const { PDFParse } = require('pdf-parse');
connectionDb();
app.use(express.urlencoded({ extended: true }));
  const upload = multer({ dest: 'uploads/' });

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
app.post("/upload",upload.single("resume")
,async(req,res)=>{
    console.log(req.file);
    const parser = new PDFParse({ url: `${req.file.path}` });
    const result = await parser.getText();
    const sections = {};
const lines = result.text.split("\n");

let currentSection = null;

const validSections = [
    "SUMMARY",
    "ABOUT ME",
    "PROFILE",
    "SKILLS",
    "TECHNICAL SKILLS",
    "PROJECTS",
    "EXPERIENCE",
    "EDUCATION"
];

for (let line of lines) {
    line = line.trim();

    if (!line) continue;

    if (validSections.includes(line.toUpperCase())) {
        currentSection = line.toUpperCase();
        sections[currentSection] = "";
    }
    else if (currentSection) {
        sections[currentSection] += line + " ";
    }
}

console.log(sections);
})





app.listen(port,()=>{
    console.log("Work");
})