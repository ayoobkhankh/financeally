$(document).ready(function () {

    //hide scroll bars
    $("body").css("overflow", "hidden");

    $('#SelectParty').prop("disabled", true);
    $('#RefreshPartList').prop("disabled", true);
    $('#AddBranch').prop("disabled", true);
    $("#PartyAdrId").val(1);

    $('[data-toggle="tooltip"]').tooltip();


    $("#AdrIdList").select2({
        placeholder: "Select Customer",
        allowClear: true
    });

    $("#SelectParty").select2({
        placeholder: "Select Customer",
        allowClear: true,
        dropdownAutoWidth: true,
        width: '100%'
    });

    $("#AdrType").select2({
        placeholder: "Select Customer",
        allowClear: true,
        minimumResultsForSearch: 5
    });

    $("#SelectState").select2({
        placeholder: "State",
        allowClear: true
    });

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

    async function GetPartyList() {
        var partylist = '<option></option>';
        await ListOfParty().then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                partylist += '<option value="' + row.id + '">' + row.id + ' . ' + row.PartyName + '</option>';
                // console.log(row.CustName);
            }
        });
        $('#SelectParty').html(partylist);
    };

    GetPartyList()
    // function GetNextAdrID() {
    //     var PartyIdforBr = $('#SelectParty option:selected').val();
    //     // $('#PartyId').val();
    //     var NewAdrId;
    //     connection.query('SELECT MAX(PartyAdrId) as PartyAdrId FROM party WHERE PartyId=' + PartyIdforBr, function (err, results, rows) {
    //         if (err) {
    //             console.log(err);
    //         };
    //         NewAdrId = (results[0].PartyAdrId) + 1;
    //         $("#PartyAdrId").val(NewAdrId);

    //     });

    // };

    // function GetListofAdrID() {
    //     var PartyIdforBr = $('#SelectParty option:selected').val();
    //     var AdrIdList = '';
    //     connection.query('SELECT PartyAdrId FROM party WHERE PartyId="' + PartyIdforBr + '"ORDER BY PartyAdrId', function (err, rows) {
    //         if (err) {
    //             console.log(err);
    //         };
    //         for (var i = 0; i < rows.length; i++) {
    //             var row = rows[i];
    //             AdrIdList += '<option value=' + row.PartyAdrId + '>' + row.PartyAdrId + '</option>';
    //             // console.log(row.CustName);
    //         }
    //         $('#AdrIdList').html(AdrIdList);
    //     });
    // };

    // $("#AddBranch").click(function () {
    //     $('#PartyName').prop("disabled", true);
    //     $('#PartyPAN').prop("disabled", true);
    //     $('#AdrIdList').prop("disabled", true);
    //     $("#PartyGSTIN").val("");
    //     // $("#PartyAdrId").val("1");
    //     $("#PartyAdrType").val('main').trigger("change");
    //     $("#SelectState").val('').trigger("change");
    //     $("#statecode").val("");
    //     $("#PartyAdr").val("");
    //     $("#PartyPin").val("");
    //     $("#PartyPOC").val("");
    //     $("#PartyPhone").val("");
    //     $("#PartyEmail").val("");
    //     $("#PartyAdrId").val(1);
    // });

    // function GetNewPartyID() {
    //     var numrows;
    //     var newid;
    //     connection.query('SELECT * FROM metadata WHERE Settings="NextPartyId"', function (err, results, rows) {
    //         if (err) {
    //             console.log(err);
    //         };
    //         numrows = results.length;
    //         if (numrows == 0) {
    //             var data = {
    //                 Settings: "NextPartyId",
    //                 Setvalue: 0
    //             };
    //             connection.query('INSERT INTO metadata SET?', data, function (err, rows, fields) {
    //                 if (err) {
    //                     console.log(err);
    //                 };
    //                 $('#PartyId').val(1);
    //             });

    //         } else {
    //             connection.query('SELECT * FROM metadata WHERE Settings="NextPartyId"', function (err, rows, fields) {
    //                 if (err) {
    //                     console.log(err);
    //                 };
    //                 newid = rows[0].Setvalue;
    //                 // console.log(newid + 1);
    //                 $('#PartyId').val(newid + 1);
    //             });
    //         };
    //     });
    // };

    // function UpdatePartyID() {
    //     var pool = require("../server/pool");
    //     var PartId = $('#PartyId').val();
    //     // pool.getConnection(function (err, connection) {
    //     connection.query('UPDATE metadata SET Setvalue=' + PartId + ' WHERE Settings="NextPartyId"', function (err, results, rows) {
    //         if (err) {
    //             console.log(err);
    //         };
    //     });
    // };

    function ClearAll() {
        $('#PartyId').val("");
        $("#PartyName").val("");
        $("#PartyPAN").val("");
    };

    $(":checkbox").change(function () {
        if ($(this).is(':checked')) {
            $('#SelectParty').prop("disabled", true);
            $('#RefreshPartList').prop("disabled", true);
            ClearAll();
        } else {
            $('#SelectParty').prop("disabled", false);
            $('#RefreshPartList').prop("disabled", false);
            $("#PartyId").val('');
        }
    });

    $("#SaveParty").click(function () {
        $('#ManageCustFrm').parsley().validate();
        if ($('#ManageCustFrm').parsley().isValid()) {
            var PartyId = $('#PartyId').val();
            var NewPartyId
            if (PartyId == "" || typeof PartyId == 'undefined') {
                NewPartyId = 0
            } else NewPartyId = parseInt(PartyId);
            var PartyName = $('#PartyName').val();
            var PartyPAN = $('#PartyPAN').val();
            var data = [NewPartyId, PartyName, PartyPAN];
            AddOrUpdateParty(...data).then(result => alert(result));
        }
    });

    //         connection.query('SELECT * FROM party WHERE PartyId=' + PartyId, function (err, results, rows) {
    //             if (err) {
    //                 console.log(err);
    //             };
    //             var numrows1 = results.length;
    //             // console.log(numrows);
    //             if (numrows1 == 0) {
    //                 connection.query('INSERT INTO party SET?', data, function (err, result) {
    //                     if (err) {
    //                         console.log(err);
    //                     };
    //                     alert('Party: ' + PartyName + ' saved!');
    //                     UpdatePartyID();
    //                     GetNewPartyID();
    //                     ClearAll();
    //                     $('#PartyName').prop("disabled", false);
    //                     $('#PartyPAN').prop("disabled", false);
    //                     $('#AdrIdList').prop("disabled", false);
    //                     $("#PartyAdrId").val(1);
    //                 });
    //             } else {
    //                 connection.query('SELECT * FROM party WHERE PartyId=? AND PartyAdrId=?', [PartyId, PartyAdrId], function (err, results, rows) {
    //                     if (err) {
    //                         console.log(err);
    //                     };
    //                     var numrows2 = results.length;
    //                     if (numrows2 == 0) {
    //                         connection.query('INSERT INTO party SET?', data, function (err, result) {
    //                             if (err) {
    //                                 console.log(err);
    //                             };
    //                             alert('Party: ' + PartyName + ' saved!');
    //                             UpdatePartyID();
    //                             GetNewPartyID();
    //                             ClearAll();
    //                             GetListofAdrID();
    //                         });

    //                     } else {
    //                         connection.query('UPDATE party SET? WHERE PartyId=? AND PartyAdrId=?', [data, PartyId, PartyAdrId], function (err, result) {
    //                             if (err) {
    //                                 console.log(err);
    //                             };
    //                             alert('Tax: Updated');
    //                             UpdatePartyID();
    //                             GetNewPartyID();
    //                             ClearAll();
    //                         });
    //                     };
    //                 });
    //             };
    //         });
    //     };
    // });

    $("#RefreshPartList").click(function () {
        GetPartyList();
    });

    $('#SelectParty').on('change', function (e) {
        var SelectedPartyID = this.value;
        GetPartyDetails(SelectedPartyID).then(rows => {
            var row = rows[0];
            $('#PartyId').val(row.id);
            $("#PartyName").val(row.PartyName);
            $("#PartyPAN").val(row.PartyPAN);
        });
    });

});