const express =require("express") ;
const ejs =require("ejs") ;
const body_parser= require("body-parser") ;
const mongoose = require("mongoose") ;
const path = require('path');
const app=express() ;


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAd7_7KEVztjv6psnI97b7qkf0JuoGILEc");


app.set('view engine','ejs') ;
app.use(express.static("public")) ;
app.use(body_parser.urlencoded({extended:true})) ;

// mongoose.connect('mongodb+srv://kirtanlakhotia:Kir%4002062@saltifywebapp.b7insjg.mongodb.net/SaltifyDB') ;
mongoose.connect('mongodb+srv://kirtanlakhotia:Kir%4002062@saltifywebapp.b7insjg.mongodb.net/SaltifyDB') ;

const contact_schema =new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    mobile:String,
    country:String,
    city:String,
    anything:String
}) ;


async function run(text) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b"});
    const result = await model.generateContent(["you are an saltify ai. saltify is an bamboosalt manufacturing company. dont give response more than 5 lines: "+text]);
    return result.response.text();
  }


const Contact =mongoose.model("Contact",contact_schema) ;
const contact1=new Contact({
    first_name:"Kirtan",
    last_name:"lakhotia",
    email:"k@123",
    mobile:123,
    country:"India",
    city:"Indore",
    anything:"hi buddy"
}) ;

// contact1.save() ;



app.get("/",function(req,res){
    res.render("home") ;
})

app.get("/contact",function(req,res){
    res.render("contact") ;
})

// app.get("/brochure",function(req,res){
//     res.redirect("https://drive.google.com/file/d/1yC18Jhm8HPKasSDWCDNTJfKpqBrnXUcm/view?usp=drive_link");
// })
app.get("/brochure", function (req, res) {
    const filePath = path.join(__dirname, "public", "images", "Saltify Brochure.pdf"); // Replace 'brochure.pdf' with your document name
    res.sendFile(filePath, function (err) {
        if (err) {
            console.error("Error sending file:", err);
            res.status(500).send("Error serving the document");
        }
    });
});

app.post("/contact",function(req,res){
    var saved_first_name=req.body.first_name
    var saved_last_name=req.body.last_name

    const contact2=new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        mobile:req.body.mobile,
        country:req.body.country,
        city:req.body.city,
        anything:req.body.anything
    }) ;
contact2.save() ;
res.render("contact_success",{
                  first_name:saved_first_name,
                  last_name:saved_last_name 
                }) ;
})
// process.env.PORT||3000


app.get("/saltify_ai", function(req,res){
    // run("tell me things about bamboosalt") ;
    res.render("saltify_ai",{output:null}) ;
}) ;

app.post("/saltify_ai",async function(req,res){
    console.log(req.body.text_input) ;
    const ans= await run(req.body.text_input) ;
    res.render("saltify_ai", { output: ans });    
}) ;


app.listen(process.env.port || 8080,function(){
    console.log("server is running at port 8080") ;
}) ;
