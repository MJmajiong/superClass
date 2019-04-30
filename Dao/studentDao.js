var dbutil = require("./dbutil");

function insertStudent(stuNum, name, stuClass, age, password, success) {
    var querySql = "insert into student (stu_num, name, class, age, password) values(?, ?, ?, ?, ?)";
    var params = [stuNum, name, stuClass, age, password];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            console.log(result);
            success(result);
        }else{
            throw  new Error(error);
        }
    });
    connection.end();
}

function queryAllStudent(success) {
    var querySql = "select * from student;";
    var connection = dbutil.createConnection();            //当connect连接断开的时候还能再次连接数据库
    connection.connect();
    connection.query(querySql, function (error, result) {
        if(error == null){
            console.log(result);
            success(result);
        }else{
            throw  new Error(error);
        }
    });
    connection.end();
}

function queryStudentByClassAndAge(classNum, age) {
    // var querySql = "select * from student where class = " + classNum + ";";   //这样子容易sel注入，一般不这样做，用下面那种方法

    var querySql = "select * from student where class = ? and age = ?;";
    var queryParams = [classNum, age];            //如果是一个参数的话就直接在query那里写，如果是多个，就要弄成数组再传进去，不懂的话就点开来看源码定义
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, queryParams,  function (error, result) {
        if(error == null){
            console.log(result);
        }else{
            console.log(error)
        }
    });
    connection.end();
}

function queryStudentByStuName(stuName, success) {
    var querySql = "select * from student where stu_num = ?;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, stuName, function (error, result) {
        if(error == null){
            console.log(result);
            success(result);
        }else{
            throw  new Error(error);
        }
    });

    connection.end();
}



module.exports = {"queryAllStudent":queryAllStudent,
                    "queryStudentByClassAndAge":queryStudentByClassAndAge,
                    "queryStudentByStuName":queryStudentByStuName,
                    "insertStudent":insertStudent};