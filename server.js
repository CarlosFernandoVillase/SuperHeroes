const request = require("request");
const express = require("express");
const app = express("app");
const bodyparser=require("body-parser")
var urlencodedParser = bodyparser.urlencoded({extended: false});

app.set("view engine","ejs");

app.use(express.static("public"));
app.use("/js",express.static(__dirname + "public/js"));
app.use("/css",express.static(__dirname + "public/css"));

app.get("/",async (req,res)=>{
    res.render("index")
});

app.post("/findHero",urlencodedParser,function(req,response){
    request('https://superheroapi.com/api/145492104470348/search/'+req.body.hero,{json: true},(error,res,body)=>{
        if(error){return console.log(error);}
        console.log(body.results[0])
        response.render("supahero",{info:body.results[0]})

    });
});

app.listen(3000);