var path = new Map();
var url = require("url");
var fs = require("fs");
var fileListDao = require("../Dao/fileListDao");


function getPic(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params.path);
    try{
        var data = fs.readFileSync("./" + params.path);         //把文件读出来然后再返回回去
        response.writeHead(200);
        response.write(data);
        response.end();
    }catch (e) {
        response.writeHead(404);
        response.end();
    }
}

path.set("/getPic", getPic);

module.exports.path = path;