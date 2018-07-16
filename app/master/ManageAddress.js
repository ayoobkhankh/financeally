$(document).ready(function () {

    //hide scroll bars
    $("body").css("overflow", "hidden");

    var fs = require("fs");
    var path = require('path');
    var datafile = path.join(__dirname, '../../config/statelist.json');
    var jsonstatelist = fs.readFileSync(datafile);
    var statelist = JSON.parse(jsonstatelist);
    var states = '<option></option>';
    for (var i = 0; i < statelist.length; i++) {
        states += '<option value="' + statelist[i].statecode + '">' + statelist[i].statename + '</option>';
    }
    $('#SelectState').html(states);

    $('#SelectState').on('change', function (e) {
        SelectedStateCode = $('#SelectState').val();
        $('#statecode').val(SelectedStateCode);
    });

    // $('#SelectParty').prop("disabled", true);
    // $('#RefreshPartList').prop("disabled", true);
    // $('#AddBranch').prop("disabled", true);
    // $("#PartyAdrId").val(1);

    $('[data-toggle="tooltip"]').tooltip();


    $("#AdrIdList").select2({
        placeholder: "Select Address",
        allowClear: true
    });

    $("#AdrType").select2({
        allowClear: true,
        minimumResultsForSearch: 5
    });

    $("#SelectState").select2({
        placeholder: "State",
        allowClear: true
    });

    $("#AddressType").select2({
        allowClear: false,
        dropdownAutoWidth: true,
        width: '100%'
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

    // function GetPartyList() {
    //     var partylist = '<option></option>';
    //     ListOfParty(function (rows) {
    //         for (var i = 0; i < rows.length; i++) {
    //             var row = rows[i];
    //             partylist += '<option value="' + row.PartyId + '">' + row.PartyId + ' . ' + row.PartyName + '</option>';
    //         }
    //         $('#SelectParty').html(partylist);
    //     });
    // };

    // GetPartyList()

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
        $("#Address").val("");
        $("#AddressType").val('HO').trigger("change");
        $("#SelectState").val('').trigger("change");
        $("#statecode").val("");
        $('#Pin').val("");
        $("#GSTIN").val("");
        $("#Phone").val("");
        $("#POC").val("");
        $("#SEmail").val("");
        $("#BranchCode").val("");
    };

    $("#RefreshAdrtList").click(function () {
        GetListofAdresses();
        ClearAll();
    });


    $("#SaveAddress").click(function () {
        $('#ManageSelfAdrFrm').parsley().validate();
        if ($('#ManageSelfAdrFrm').parsley().isValid()) {
            var AdrId = $('#AdrIdList').val();
            var NewAdrId;
            if (AdrId == undefined || AdrId == '') {
                NewAdrId = 0
            } else NewAdrId = AdrId;
            var AddressType = $('#AddressType option:selected').val();
            var GSTIN = $('#GSTIN').val();
            var BranchCode = $("#BranchCode").val();
            var Address = $('#Address').val();
            var State = $('#SelectState option:selected').text();
            var StateCode = $('#SelectState option:selected').val();
            var Pin = $('#Pin').val();
            var POC = $('#POC').val();
            var Phone = $('#Phone').val();
            var Email = $('#SEmail').val();
            var data = [NewAdrId, AddressType, Address, State, StateCode, Pin, GSTIN, BranchCode, Phone, POC, Email];
            AddOrUpdateSelfAdr(...data).then(result => alert(result));
        }
    });

    // $("#RefreshPartList").click(function () {
    //     GetPartyList();
    // });
    async function DisplaySelfDetails() {
        await GetSelfDetails(1).then(rows => {
            var row = rows[0];
            $("#SelfName").html("Company Name: " + row.SelfName);
            $("#SelfPAN").html("PAN: " + row.SelfPAN);
            $("#SelfRegNo").html("Reg No: " + row.Regno);
        });
    }

    DisplaySelfDetails();

    async function GetListofAdresses() {
        var adridlist = '<option></option>';
        await ListOfAddresses().then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                adridlist += '<option value="' + row.id + '">' + row.id + '. ' + row.AddressType + '</option>';
            }
        })
        $('#AdrIdList').html(adridlist);
    }

    GetListofAdresses();

    $('#AdrIdList').on('change', function (e) {
        var SelectedAdrID = this.value;
        GetSelectedAddressDetails(SelectedAdrID).then(rows => {
            var row = rows[0];
            $("#GSTIN").val(row.GSTIN);
            $("#BranchCode").val(row.BranchCode);
            $("#Address").val(row.Address);
            $("#AddressType").val(row.AddressType).trigger("change");
            $("#SelectState").val(row.StateCode).trigger("change");
            $("#statecode").val(row.StateCode);
            $("#Pin").val(row.PIN);
            $("#POC").val(row.POC);
            $("#Phone").val(row.Phone);
            $("#SEmail").val(row.Email);

        });
    });

});