const mysql = require('mysql')

const database = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'APm64Rz82/dc25%PkVb12IN0',
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