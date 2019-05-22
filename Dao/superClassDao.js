var dbutil = require("./dbutil");

function getClassWeek(classWeek){
    let bb = classWeek.split(',');
    const reg = /-/g;
    let dd = []
    bb.forEach(item => {
        let flag = reg.test(item)
        if(flag){
            let cc=item.split('-')
            for(let i = cc[0]; i <= cc[1]; i++){
                dd.push(i)
            }
        }else{
            dd.push(item)
        }
    })
    return dd
}

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

function updateClassInformation(information, success){
    let weekNum = getClassWeek(information.weekNum)
    let str = '('
    weekNum = weekNum.map(item => {
        str += item
        str += ','
        return parseInt(item)
    })
    str=str.substring(0,str.length-1)
    str += ')'
    console.log(weekNum)
    var querySql = "update classInformation set className=?, classRoom=?, weekNum=?, teacher=?, descrition=? where dayOfWeek=? and classNum=? "
    let params = [information.className, information.classRoom, information.weekNum, information.teacher,  information.descrition, information.dayOfWeek, information.classNum];
    var connection = dbutil.createConnection();
    connection.connect(); 
    connection.query(querySql, params, function (error, result){
        if(error == null){
            console.log(result)
            success(result)
        }else{
            throw new Error(error)
        }
    })
    connection.end()
}

function deleteClassInformation(information, success){
    console.log(information, 88888888888888888888888)
    var querySql = "update classInformation set className='', classRoom='', weekNum='', teacher='', descrition='' where dayOfWeek=? and classNum=?;";
    var connection = dbutil.createConnection();
    connection.connect();
    var params = [information.dayOfWeek, information.classNum];
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
                  "searchClassInformation":searchClassInformation,
                "updateClassInformation":updateClassInformation,
                "deleteClassInformation":deleteClassInformation};