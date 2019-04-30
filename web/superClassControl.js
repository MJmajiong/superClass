var path = new Map();
var url = require("url");
var superClassDao = require("../Dao/superClassDao");
var queryString = require("querystring");

var data = "";
function saveData(request, response) {
    console.log(request.body);
    // superClassDao.inserSuperClassData(request.body.className, request.body.classRoom,request.body.weekNum, request.body.teacher, function (result) {
    //     response.writeHead(200);
    //     response.write("写入成功");
    //     response.end();
    // })

}

function search(request, response) {
    // console.log(request.body);
    superClassDao.searchUserAndPassword(request.body.user, request.body.password, function (result) {
        // console.log(result[0].studentPassword, 6566666);
        // console.log(result[0].studentUser);
        console.log(result.length, 8888888);
        var dataString = JSON.stringify(result);
        var dataParse = JSON.parse(dataString);
        // console.log(JSON.parse(dataString).length);
        console.log(dataParse.length)
        if(dataParse.length > 0){
            if(dataParse[0].studentPassword === request.body.password){
                // response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
                // response.write({message:"查找成功",msg:0}.toString());
                // response.end()
                // response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
                response.status(200).json({message:"查找成功", msg:1})
                // response.end()
            }else {
                try{
                    // response.writeHead(500, {"Content-Type":"text/html; charset=utf-8"});
                    response.status(500).json({message:"密码错误", msg:0});
                    // response.end();
                }
                catch (e) {
                    throw new Error()
                }

            }
        }else{
            // response.writeHead(500, {"Content-Type":"text/html; charset=utf-8"});
            // response.write({message:"学号不存在", msg:0});
            // response.end()
            response.status(500).json({message:"学号不存在", msg:0})
        }

    })
}

function getClassInformation(request, response) {
    // console.log(request);
    // console.log(request.body);
    // console.log(request.path);
    // console.log(request.query);
    // response.json({aa:11})
    // console.log(request.query);
    console.log("jinlaile")
    superClassDao.searchClassInformation(request.query.week, request.query.studentUser, function (result) {
        // console.log(result);
        var dataString = JSON.stringify(result);
        var dataJson = JSON.parse(dataString);
        response.json(dataJson);
    })
}

path.set("/api/saveData", saveData);
path.set("/api/search", search);
path.set("/api/getClassInformation", getClassInformation);



module.exports.path = path;