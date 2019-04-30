var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var cookie = require("cookie-parser");                     //cookie的中间件
var multer = require("multer");                          //解析文件上传的中间件
var bodyParser = require("body-parser");

var app = new express();
var uploadSingle = multer({dest:"./file/"});
var urlencodeParser = bodyParser.urlencoded({extended:false});
var jsonParser = bodyParser.json();


app.use(express.static('./page'));
app.use(cookie());


app.get("/api/*", function (request, response, next){
    // console.log("jinlaile")
    console.log(request.cookies);
    // if(request.cookies.id){
    //     next()
    // }else {
    //     response.redirect("/login.html");
    // }
    next()
});


app.get("/api/getAllStudent", loader.get("/api/getAllStudent"));
app.get("/api/addStudent", loader.get("/api/addStudent"));
app.get("/login", loader.get("/login"));
app.post("/upload", uploadSingle.single("filename"), loader.get("/upload"));      //指定哪个字段是文件
app.get('/getPic', loader.get("/getPic"));

app.post("/api/saveData", jsonParser, loader.get("/api/saveData"));
app.post("/api/search", jsonParser, loader.get("/api/search"));
app.get("/api/getClassInformation",loader.get("/api/getClassInformation"));


app.listen(9999);
