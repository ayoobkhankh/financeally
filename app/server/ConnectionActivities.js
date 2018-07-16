var mysql = require('mysql');
var fs = require("fs");
var path = require('path');

var datafile = path.join(__dirname, '../../config/config.json');

function SaveConnection(id, conname, servername, portno, username, password, dbname) {
    var datafile = path.join(__dirname, '../../config/config.json');
    var data = fs.readFileSync(datafile)
    var obj = JSON.parse(data);
    var condetailsobj = obj.connections;
    if (condetailsobj.length === 0) {
        var data = {
            'id': (Math.floor(Math.random() * 99999) + 11111),
            'conname': conname,
            'servername': servername,
            'portno': portno,
            'username': username,
            'password': password,
            'dbname': dbname
        }
        obj.connections.push(data);
        var content = JSON.stringify(obj);
        fs.writeFile(datafile, content, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
        return;
    } else {
        for (var i = 0; i < condetailsobj.length; i++) {
            if (condetailsobj[i].id === id) {
                var row = condetailsobj[i];
                row.conname = conname;
                row.servername = servername;
                row.portno = portno;
                row.username = username;
                row.password = password;
                row.dbname = dbname;
                var content = JSON.stringify(obj);
                fs.writeFile(datafile, content, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                return;
            } else {
                var data = {
                    'id': (Math.floor(Math.random() * 99999) + 11111),
                    'conname': conname,
                    'servername': servername,
                    'portno': portno,
                    'username': username,
                    'password': password,
                    'dbname': dbname
                }
                obj.connections.push(data);
                var content = JSON.stringify(obj);
                fs.writeFile(datafile, content, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                return;
            }
        }
    }
}



function SaveCurConnection(selconname, selservername, selport, selusername, selpassword, seldbname) {

    var datafile = path.join(__dirname, '../../config/config.json');
    var data = fs.readFileSync(datafile)
    var obj = JSON.parse(data);
    var condetailsobj = obj.currentconnection;
    var row = condetailsobj[0];
    row.conname = selconname;
    row.servername = selservername;
    row.portno = selport;
    row.username = selusername;
    row.password = selpassword;
    row.dbname = seldbname;
    var content = JSON.stringify(obj);
    fs.writeFile(datafile, content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function GetUsersList(selconname, selservername, selport, selusername, selpassword, seldbname, callback) {
    var testcon = mysql.createConnection({
        host: selservername,
        port: selport,
        user: selusername,
        password: selpassword,
        database: seldbname
    });

    testcon.query("SELECT UserId, Name FROM users ORDER BY UserId", function (err, rows) {
        if (err) {
            console.log(err);
        }
        callback(rows);
    });
    testcon.end(function () {
        // The connection has been closed
    });
}

function GetUserDetails(UserId, selconname, selservername, selport, selusername, selpassword, seldbname, callback) {
    var testcon = mysql.createConnection({
        host: selservername,
        port: selport,
        user: selusername,
        password: selpassword,
        database: seldbname
    });

    testcon.query("SELECT * FROM users WHERE UserId = ?", [UserId], function (err, rows) {
        if (err) {
            console.log(err);
        }
        callback(rows);
    });
    testcon.end(function () {
        // The connection has been closed
    });
}

function SaveOrUpdateUser(selconname, selservername, selport, selusername, selpassword, seldbname, UserId, Name, Role, UserName, Password) {
    var testcon = mysql.createConnection({
        host: selservername,
        port: selport,
        user: selusername,
        password: selpassword,
        database: seldbname
    });

    testcon.query("INSERT INTO users (UserId, Name, Role, UserName, Password, CreatedTime)" +
        "VALUES(" + UserId + ",'" + Name + "','" + Role + "','" + UserName + "','" + Password + "'," + null + ")" +
        "ON DUPLICATE KEY UPDATE Name ='" + Name + "', Role = '" + Role + "', UserName = '" + UserName + "',  Password = '" + Password + "', CreatedTime =" + null + ";",
        function (err, rows, fields) {
            if (err) {
                alert(err);
                return;
            } else {
                alert("User details saved!");
            };
        })

    testcon.end(function () {
        // The connection has been closed
    });
}

function ValidateUser(selservername, selport, selusername, selpassword, seldbname, UserName, Password, callback) {
    var testcon = mysql.createConnection({
        host: selservername,
        port: selport,
        user: selusername,
        password: selpassword,
        database: seldbname
    });

    testcon.query("SELECT * FROM users WHERE UserName = ? AND Password = ?", [UserName, Password], function (err, rows) {
        if (err) {
            console.log(err);
        }
        callback(rows);
    });
    testcon.end(function () {
        // The connection has been closed
    });
}