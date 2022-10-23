const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'y8237922',
    port:3306,
    database:'mydb',
});

function getAllMembers(callback){
    connection.query(`SELECT * FROM USER`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

function getLoginUser(user_id, callback){
    connection.query(`SELECT * FROM USER WHERE email="${user_id}"`, (err, rows, fields) => {
        if(err){
            console.log("error!!!");
            throw err;
        }
        callback(rows);
    });
}

function signIn(user_id, password, callback) {
    connection.query(`SELECT * FROM USER WHERE email="${user_id}" AND password="${password}"`, (err, rows, fields) => {
        if(err){
            console.log("error!!!");
            throw err;
        }
        callback(rows);
    });
}

module.exports = {
    getAllMembers,
    getLoginUser,
    signIn
}