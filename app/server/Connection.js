var mysql = require('mysql');
var fs = require("fs");
var path = require('path');

var datafile = path.join(__dirname, '../../config/config.json');
var data = fs.readFileSync(datafile)
var obj = JSON.parse(data);
var condetailsobj = obj.currentconnection;
var row = condetailsobj[0];

var servername = row.servername;
var port = row.portno;
var dbname = row.dbname;
var username = row.username;
var password = row.password;

var connection = mysql.createPool({
    multipleStatements: true,
    host: servername,
    port: port,
    user: username,
    password: password,
    database: dbname
});

module.exports = connection;