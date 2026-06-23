const input = document.getElementById("resume");
const fileName = document.getElementById("fileName");

input.addEventListener("change",()=>{
     if(input.files[0]){
        fileName.innerText=input.files[0].name;
     }
     else{
        fileName.innerText="No file selected";
     }
})
