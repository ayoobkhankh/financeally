const ipc = require('electron').ipcRenderer


$(document).ready(function () {

    //hide scroll bars
    $("body").css("overflow", "hidden");

    var fs = require("fs");
    var path = require("path");

    var adminusername, adminpassword, ActionReq;

    var datafile = path.join(__dirname, '../../config/config.json');

    var data = fs.readFileSync(datafile)
    obj = JSON.parse(data);
    var adminobj = obj.admin;

    var row = adminobj[0];
    adminusername = row.adminusername;
    adminpassword = row.adminpassword;
    // console.log(adminusername);
    // console.log(adminpassword);

    $("#AuthenticateBtn").click(function () {
        var adminusername_input = $('#adminusername_input').val();
        var adminpassword_input = $('#adminpassword_input').val();
        if (adminusername_input == adminusername && adminpassword_input == adminpassword) {
            switch (ActionReq) {
                case 'ForShowManageCon':
                    ipc.send('ShowManageCon', 'ping')
                    break;
                case 'ShowManageUsers':
                    ipc.send('ShowManageUsers', 'ping')
                    break;
            }
        } else {
            alert("Invalid Credentials!")
        }

    });

    $("#ShowManageCon").click(function () {
        ipc.send('ShowManageCon', 'ping')
    });

    ipc.on('ActionReq', (event, arg) => {
        ActionReq = arg;
    });

});