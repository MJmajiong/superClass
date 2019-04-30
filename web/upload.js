var path = new Map();
var url = require("url");
var fileListDao = require("../Dao/fileListDao");


function upload(request, response) {
    // var params = url.parse(request.url, true).query;
    // console.log(request.file.mimeType);             //不用非得保存后缀，可以通过下面的这些字段来知道文件的信息
    // console.log(request.file.originalname);
    // console.log(request.file.size);
    // console.log(request.file.path);
    // console.log(params);
    // response.end("finish");

    fileListDao.insertFileList(request.file.originalname, request.file.size, request.file.path, request.cookies.id, function (result) {
        console.log("写库成功");
        response.end(request.file.path);
    })
}

path.set("/upload", upload);

module.exports.path = path;