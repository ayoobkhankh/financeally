var mysql = require('mysql');
var fs = require("fs");
var path = require('path');
var datafile = path.join(__dirname, '../../config/config.json');
// var jsonPath = path.join(__dirname, '..', 'config', 'config.json');
// var config = fs.readFileSync(jsonPath, 'utf8');

var config = fs.readFileSync(datafile);
var credentials = JSON.parse(config);

var server = credentials.servername;
var port = credentials.portname;
var dbname = credentials.databasename;
var user = credentials.user;
var password = credentials.password;

var pool = mysql.createPool({
    multipleStatements: true,
    host: server,
    port: port,
    user: user,
    password: password,
    database: dbname
});

module.exports = pool;

// var getConnection = function (callback) {
//     pool.getConnection(function (err, connection) {
//         callback(err, connection);
//     });
// };

// module.exports = db;