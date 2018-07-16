var fs = require("fs");
var path = require('path');
var mysql = require('mysql');

var datafile = path.join(__dirname, '../../config/config.json');
fs.exists(datafile, function (exists) {
    if (!exists) {
        console.log("Dont Exist")
        fs.writeFileSync(datafile);
    }
});


// var config = fs.readFileSync(datafile);
// credentials = JSON.parse(config);
// // console.log(credentials);

// let student = {  
//     name: 'Mike',
//     age: 23, 
//     gender: 'Male',
//     department: 'English',
//     car: 'Honda' 
// };

// cart.push(student)

// // let data = JSON.stringify(credentials);  
// // fs.writeFileSync(datafile, data);  

// var content = JSON.stringify(credentials);

//         fs.writeFile(datafile, content, 'utf8', function (err) {
//             if (err) {
//                 return console.log(err);
//             }
//             // $("#ServerMsg").html("Configuration saved..");
//         });


// console.log(content);

function SaveConnection(servername, port, dbname, username, password) {
    var servername = servername;
    var port = port;
    var dbname = dbname;
    var username = username;
    var password = password;

    var con = mysql.createConnection({
        host: servername,
        port: port,
        user: username,
        password: password,
        database: dbname
    });

    con.connect(function (err) {
        if (err) throw err;
        var datafile = path.join(__dirname, '../../config/config.json');
        var output = {
            'servername': servername,
            'port': port,
            'dbname': dbname,
            'username': username,
            'password': password
        };
        var content = JSON.stringify(output);

        fs.writeFile(datafile, content, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });

    });

    con.end(function () {
        // The connection has been closed
    });

}

// function ListOfConnections(callback) {
//     let db = new sqlite3.Database('../../config/config.db');

//     let sql = 'SELECT * FROM connections';

//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             throw err;
//         }
//         callback(null, rows);
//     });
// }


function SendCredentials() {
    var obj;
    var datafile = path.join(__dirname, '../../config/config.json');
    var data = fs.readFileSync(datafile)
    obj = JSON.parse(data);
    return obj;
}