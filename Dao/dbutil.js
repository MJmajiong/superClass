 var mysql = require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host:"39.108.2.103",
        // host:"127.0.0.1",
        port:"3306",
        user:"root",
        password:"Kbqn88520.",
        // password:"kbqn88520",
        database:"school"
    });

    return connection;
}

module.exports.createConnection = createConnection;