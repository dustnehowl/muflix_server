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

function signUp(new_user, callback){

    connection.query(`SELECT * FROM USER`, (err, rows, fields) => {
        if(err) throw err;
        connection.query(`SELECT * FROM USER WHERE email="${new_user.user_id}"`, (err2, rows2, fields) => {
            if(err2) throw err2;
            if (rows.length > 0) return 0;
            else{
                const user_num = rows.length + 1;
                connection.query(`INSERT INTO USER 
                ( id, name, phone, email, password ) 
                VALUE (${user_num}, "${new_user.이름}", "${new_user.전화번호}", "${new_user.user_id}", "${new_user.password}");`
                );
                callback(rows);
            }
        });
    })
}

module.exports = {
    getAllMembers,
    getLoginUser,
    signIn,
    signUp,

}