const ipc = require('electron').ipcRenderer

$(document).ready(function () {

    var fs = require("fs");
    var path = require("path");

    $("#SelectCon").select2({
        placeholder: "Select Connection",
        allowClear: true
    });

    $("#SelectUsr").select2({
        placeholder: "Select User",
        allowClear: true
    });

    $("#SelectRole").select2({
        placeholder: "Select Role",
        allowClear: true
    });

    //hide scroll bars
    $("body").css("overflow", "hidden");

    $('#SelectUsr').prop("disabled", true);
    $('#RefreshUsersList').prop("disabled", true);

    function GetConList() {
        $('#SelectCon').html("");
        var conlist = '<option></option>';
        var datafile = path.join(__dirname, '../../config/config.json');

        var data = fs.readFileSync(datafile)
        obj = JSON.parse(data);
        var conlistob = obj.connections;
        for (var i = 0; i < conlistob.length; i++) {
            var row = conlistob[i];
            conlist += '<option value=' + row.id + '>' + row.conname + '</option>';
        }
        $('#SelectCon').html(conlist);
    };

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

    $(":checkbox").change(function () {
        if ($(this).is(':checked')) {
            $('#SelectUsr').prop("disabled", true);
            $('#RefreshUsersList').prop("disabled", true);
            ClearAll();
        } else {
            $('#SelectUsr').prop("disabled", false);
            $('#RefreshUsersList').prop("disabled", false);
            ClearAll();
        }
    });

    function ClearAll() {
        $('#UserId').val("");
        $('#NameofUser').val("");
        $("#UserName").val("");
        $("#Password").val("");
        $("#SelectRole").val("").trigger("change");
    };

    // function GetUsersList() {
    //     var userlist = '<option></option>';
    //     ListOfUsers(function (rows) {
    //         for (var i = 0; i < rows.length; i++) {
    //             var row = rows[i];
    //             userlist += '<option value="' + row.UserId + '">' + row.UserId + ' . ' + row.Name + '</option>';
    //             // console.log(row.CustName);
    //         }
    //         $('#SelectUsr').html(userlist);
    //     });
    // };

    $("#RefreshUsersList").click(function () {
        var userlist = '<option></option>';

        var SelectedCon = parseInt($('#SelectCon option:selected').val());

        var datafile = path.join(__dirname, '../../config/config.json');

        var data = fs.readFileSync(datafile)
        obj = JSON.parse(data);
        var condetailsobj = obj.connections;
        for (var i = 0; i < condetailsobj.length; i++) {
            if (condetailsobj[i].id === SelectedCon) {
                var row = condetailsobj[i];
                GetUsersList(row.conname, row.servername, row.portno, row.username, row.password, row.dbname, function (result) {
                    for (var i = 0; i < result.length; i++) {
                        var row = result[i];
                        userlist += '<option value="' + row.UserId + '">' + row.UserId + ' . ' + row.Name + '</option>';
                        // console.log(row.CustName);
                    }
                    $('#SelectUsr').html(userlist);
                })
                return;
            }
        }


    });

    $('#SelectUsr').on('change', function (e) {
        var SelectedCon = parseInt($('#SelectCon option:selected').val());
        var SelectedUsr = parseInt(this.value);
        var datafile = path.join(__dirname, '../../config/config.json');

        var data = fs.readFileSync(datafile)
        obj = JSON.parse(data);
        var condetailsobj = obj.connections;
        for (var i = 0; i < condetailsobj.length; i++) {
            if (condetailsobj[i].id === SelectedCon) {
                var row = condetailsobj[i];
                GetUserDetails(SelectedUsr, row.conname, row.servername, row.portno, row.username, row.password, row.dbname, function (rows) {
                    var row = rows[0];
                    $('#UserId').val(row.UserId);
                    $("#NameofUser").val(row.Name);
                    $("#UserName").val(row.UserName);
                    $("#Password").val(row.Password);
                    $("#SelectRole").val(row.Role).trigger("change");
                })
                return;
            }
        }
    });

    $("#SaveUser").click(function () {
        var SelectedCon = parseInt($('#SelectCon option:selected').val());
        var UserId = $('#UserId').val();
        var NewUserId;
        if (UserId == "") {
            NewUserId = 0;
        } else {
            NewUserId = UserId;
        }
        var Name = $("#NameofUser").val();
        var Role = $("#SelectRole").val();
        var UserName = $("#UserName").val();
        var Password = $("#Password").val();
        var datafile = path.join(__dirname, '../../config/config.json');

        var data = fs.readFileSync(datafile)
        obj = JSON.parse(data);
        var condetailsobj = obj.connections;
        for (var i = 0; i < condetailsobj.length; i++) {
            if (condetailsobj[i].id === SelectedCon) {
                var row = condetailsobj[i];

                SaveOrUpdateUser(row.conname, row.servername, row.portno, row.username, row.password, row.dbname, NewUserId, Name, Role, UserName, Password);

            }
        }

    });
});