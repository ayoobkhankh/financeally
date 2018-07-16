$(document).ready(function () {

    const ipc = require('electron').ipcRenderer;
    var fs = require("fs");
    var path = require('path');
    var logofile;
    var signfile;
    //hide scroll bars
    $("body").css("overflow", "hidden");

    DisplaySelfDetails();

    $('[data-toggle="tooltip"]').tooltip();

    window.Parsley.on('field:error', function (fieldInstance) {
        fieldInstance.$element.popover({
            trigger: 'manual',
            container: 'body',
            placement: 'auto',
            html: true,
            title: 'Error! <a href="#" class="close" data-dismiss="alert"><i class="fa fa-times-circle" aria-hidden="true"></i></a>   ',
            content: function () {
                return fieldInstance.getErrorsMessages().join(';');
            }
        }).popover('show');

    });

    window.Parsley.on('field:success', function (fieldInstance) {
        fieldInstance.$element.popover('destroy');
    });

    $(document).on("click", ".popover .close", function () {
        $(this).parents(".popover").popover('hide');
    });

    $("#SaveMasterData").click(function () {
        $('#EditMasterForm').parsley().validate();
        if ($('#EditMasterForm').parsley().isValid()) {
            var SelfName = $('#SelfName').val();
            var SelfTagLine = $('#Tagline').val();
            var Regno = $('#RegNo').val();
            var SelfPAN = $('#SelfPAN').val();
            var data = [1, SelfName, SelfTagLine, Regno, "Demo Logo Path", SelfPAN];
            AddOrUpdateMaster(...data).then(result => alert(result));
        }
    });

    $("#OpenSelectLogoDlg").click(function () {

        ipc.send('OpenSelectLogoDlg', 'ping')

    });

    $("#OpenSelectSignDlg").click(function () {

        ipc.send('OpenSelectSignDlg', 'ping')

    });

    ipc.on('Logofilepath', function (event, arg) {
        fs.createReadStream(arg).pipe(fs.createWriteStream(path.join(__dirname, '../../dependancies/images/logo.png')));
    });

    ipc.on('Signfilepath', function (event, arg) {
        fs.createReadStream(arg).pipe(fs.createWriteStream(path.join(__dirname, '../../dependancies/images/signature.png')));
    });

    async function DisplaySelfDetails() {
        await GetSelfDetails(1).then(rows => {
            var row = rows[0];
            $('#SelfName').val(row.SelfName);
            $("#Tagline").val(row.SelfTagLine);
            $("#RegNo").val(row.Regno);
            $("#SelfPAN").val(row.SelfPAN);
        });
    }



});