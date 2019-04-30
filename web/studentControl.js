var studentDao = require("../Dao/studentDao");
var url = require("url");
var path = new Map();

function getAllStudent(request, response) {
    studentDao.queryAllStudent(function (result) {
        var head = {"Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"GET",
            "Content-Type":"text/html; charset=utf-8",
            "Access-Control-Allow-Headers":"x-request-with, content-type"};
        console.log(result);
        response.writeHead(200,head);
        response.write(JSON.stringify(result));
        response.end();
    })
}

function addStudent(request, response) {
    var params = url.parse(request.url, true).query;
    studentDao.insertStudent(params.stuNum, params.name, params.stuClass, params.age, params.password, function (result) {
        response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
        response.write("添加成功");
        response.end();
    })
}

function login(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    studentDao.queryStudentByStuName(params.stuNum, function (result) {
        if(result && result.length > 0 && result[0].password == params.password){
            //写cookie
            // console.log(request.cookies);
            response.cookie("id", result[0].id);       //注意看写 cookie 和 读cookie的区别，读的时候后面有s，写的时候后面没有s
            response.redirect("/api/getAllStudent");
        }else{
            response.redirect("/loginError.html")
        }
    })
}



path.set("/api/getAllStudent", getAllStudent);
path.set("/api/addStudent", addStudent);
path.set("/login", login);

module.exports.path = path;