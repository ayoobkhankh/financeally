const ipc = require('electron').ipcRenderer


$(document).ready(function () {

    $("#SelectCon").select2({
        placeholder: "Select Connection",
        allowClear: true
    });

    //hide scroll bars
    $("body").css("overflow", "hidden");

    var fs = require("fs");
    var path = require("path");

    var datafile = path.join(__dirname, '../../config/admin.json');
    fs.exists(datafile, function (exists) {
        if (!exists) {
            obj = {
                connections: [],
                admin: [],
                currentconnection: []
            }
            var adminobj = {
                "adminusername": "admin",
                "adminpassword": "admin"
            }
            var curconobj = {
                "conname": "",
                "servername": "",
                "portno": "",
                "username": "",
                "password": "",
                "dbname": ""
            }
            obj.admin.push(adminobj);
            obj.currentconnection.push(curconobj);
            var content = JSON.stringify(obj);
            fs.writeFile(datafile, content, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            console.log(obj);
        } else {
            var data = fs.readFileSync(datafile)
            obj = JSON.parse(data);
            console.log(obj);
        }
    });

    function GetConList() {
        $('#SelectCon').html("");
        var conlist = '<option></option>';
        var datafile = path.join(__dirname, '../../config/config.json');
        fs.exists(datafile, function (exists) {
            if (!exists) {
                obj = {
                    connections: [],
                    admin: [],
                    currentconnection: []
                }
                var adminobj = {
                    "adminusername": "admin",
                    "adminpassword": "admin"
                }
                var curconobj = {
                    "conname": "",
                    "servername": "",
                    "portno": "",
                    "username": "",
                    "password": "",
                    "dbname": ""
                }
                obj.admin.push(adminobj);
                obj.currentconnection.push(curconobj);
                var content = JSON.stringify(obj);
                fs.writeFile(datafile, content, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
                console.log(obj);
            } else {
                var data = fs.readFileSync(datafile)
                obj = JSON.parse(data);
                var conlistob = obj.connections;
                for (var i = 0; i < conlistob.length; i++) {
                    var row = conlistob[i];
                    conlist += '<option value=' + row.id + '>' + row.conname + '</option>';
                }
                $('#SelectCon').html(conlist);
            }
        });
    };

    $("#RefreshCons").click(function () {
        GetConList();
    });

    GetConList();

    $('#SelectCon').on('change', function (e) {
        var SelectedCon = parseInt(this.value);
        var datafile = path.join(__dirname, '../../config/config.json');
        var data = fs.readFileSync(datafile)
        obj = JSON.parse(data);
        var condetailsobj = obj.connections;
        for (var i = 0; i < condetailsobj.length; i++) {
            if (condetailsobj[i].id === SelectedCon) {
                var row = condetailsobj[i];
                SaveCurConnection(row.conname, row.servername, row.portno, row.username, row.password, row.dbname)
                return;
            }
        }
    });

    $("#LoginBtn").click(function () {

        // var SelectedCon = parseInt($('#SelectCon option:selected').val());
        // var UName = $('#UName').val();
        // var PWord = $('#PWord').val();
        // var datafile = path.join(__dirname, '../../config/config.json');
        // var data = fs.readFileSync(datafile)
        // obj = JSON.parse(data);
        // var condetailsobj = obj.connections;
        // for (var i = 0; i < condetailsobj.length; i++) {
        //     if (condetailsobj[i].id === SelectedCon) {
        //         var row = condetailsobj[i];
        //         ValidateUser(row.servername, row.portno, row.username, row.password, row.dbname, UName, PWord, function (result) {
        //             if (result.length == 0) {
        //                 alert("Invalid credentials!")
        //             } else {
        //                 ipc.send('show_dashboard', 'ping')
        //             }
        //         })
        //     }
        // }

        ipc.send('show_dashboard', 'ping')
    });

    $("#ShowManageCon").click(function () {
        ipc.send('ShowManageCon', 'ForShowManageCon')
    });

    $("#ShowManageUsers").click(function () {
        ipc.send('ShowAdminLogin', 'ShowManageUsers')
    });

});