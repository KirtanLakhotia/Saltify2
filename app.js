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


async function trying() {
    const cry = await Contact.find() ;
   return cry ;
}


app.get("/k", async function(req,res){
    const a =await trying() ;
    console.log(a) ; 
    let first_name = [];
    let last_name = [];
    let email = [];
    let mobile = [];
    let country = [];
    let city = [];
    let anything = [];
    
    for (var i = 0; i < a.length; i++) {
        console.log(a[i].first_name);
        first_name.push(a[i].first_name);
    
        console.log(a[i].last_name);
        last_name.push(a[i].last_name);
    
        console.log(a[i].email);
        email.push(a[i].email);
    
        console.log(a[i].mobile);
        mobile.push(a[i].mobile);
    
        console.log(a[i].country);
        country.push(a[i].country);
    
        console.log(a[i].city);
        city.push(a[i].city);
    
        console.log(a[i].anything);
        anything.push(a[i].anything);
    }
    
    console.log("First Names:", first_name);
    console.log("Last Names:", last_name);
    console.log("Emails:", email);
    console.log("Mobile Numbers:", mobile);
    console.log("Countries:", country);
    console.log("Cities:", city);
    console.log("Anything:", anything);
    res.render("contact_data",{first_name:first_name,last_name:last_name,email:email,mobile:mobile,country:country,mobile:mobile,city:city,anything:anything}) ;
}) ;



app.listen(process.env.PORT||3000,function(){

    console.log("server is running at port 3000") ;
}) ;
