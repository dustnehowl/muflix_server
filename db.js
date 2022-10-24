const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'y8237922',
    port:3306,
    database:'mydb',
});

connection.connect();

module.exports = connection;