const mongoose=require("mongoose");

async function connectionDb(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/airesume");
        console.log("Connection Start")
    }
    catch(err){
        console.log(err);
    }
}
module.exports = connectionDb;