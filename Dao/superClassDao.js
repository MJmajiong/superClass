var dbutil = require("./dbutil");

function inserSuperClassData(className, classRoom, weekNum, teacher, success) {
    var querySql = "insert into superClass (className, classRoom, weekNum, teacher) values(?, ?, ?, ?);";
    var params = [className, classRoom, weekNum, teacher];
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

function searchUserAndPassword(user, password, success) {
    console.log(user, password)
    var querySql = "select * from studentInformation where studentUser = ?;";
    var connection = dbutil.createConnection();
    connection.connect();
    console.log("guolaile");
    connection.query(querySql, user,  function (error, result) {
        if(error == null){
            console.log(result);
            success(result);
        }else{
            throw new Error(error);
        }
    });
    connection.end()
}

function searchClassInformation(week, studentUser, success) {
    console.log(week, studentUser);
    var querySql = "select * from classInformation where week = ? and studentUser = ?;";
    var connection = dbutil.createConnection();
    connection.connect();
    var params = [week, studentUser];
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result)
        }else{
            throw new Error(error);
        }
    });
    connection.end()
}





module.exports = {"inserSuperClassData":inserSuperClassData,
                  "searchUserAndPassword":searchUserAndPassword,
                  "searchClassInformation":searchClassInformation};