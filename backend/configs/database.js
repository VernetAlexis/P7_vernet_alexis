const mysql = require('mysql')
require('dotenv').config()

const database = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'groupomania',
})

database.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

module.exports = mysql

module.exports.getDB = () => {
    return database
}