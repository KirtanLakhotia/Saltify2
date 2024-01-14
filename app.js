const express =require("express") ;
const ejs =require("ejs") ;
const body_parser= require("body-parser") ;
const mongoose = require("mongoose") ;

const app=express() ;

app.set('view engine','ejs') ;
app.use(express.static("public")) ;
app.use(body_parser.urlencoded({extended:true})) ;

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


app.listen(process.env.PORT||3000,function(){
    console.log("server is running at port 3000") ;
}) ;