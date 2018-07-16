$(document).ready(function () {

    //hide scroll bars
    $("body").css("overflow", "hidden");

    var fs = require("fs");
    var path = require('path');

    var PartyAdrId;

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
        allowClear: true,
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

    async function GetPartyList() {
        var partylist = '<option></option>';
        await ListOfParty().then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                partylist += '<option value="' + row.id + '">' + row.id + ' . ' + row.PartyName + '</option>';
           
            }
        });
        $('#SelectParty').html(partylist);
    };

    GetPartyList()

    function ClearAll() {
        $("#PartyGSTIN").val("");
        $("#PartyAdrType").val('main').trigger("change");
        $("#SelectState").val('').trigger("change");
        $("#statecode").val("");
        $('#PartyAdr').val("");
        $("#PartyPin").val("");
        $("#PartyPOC").val("");
        $("#PartyPhone").val("");
        $("#PartyEmail").val("");
        $("#PartyAdrId").val(1);
    };

    $(":checkbox").change(function () {
        if ($(this).is(':checked')) {
            PartyAdrId = 0;
            ClearAll();
        }
    });

    $("#SaveParty").click(function () {
        $('#ManageCustFrm').parsley().validate();
        if ($('#ManageCustFrm').parsley().isValid()) {
                     var PartyId = $('#PartyId').val();
            var PartyAdrType = $('#PartyAdrType option:selected').val();
            var PartyGSTIN = $('#PartyGSTIN').val();
            var PartyAdr = $('#PartyAdr').val();
            var PartyState = $('#SelectState option:selected').text();
            var PartyStateCode = $('#SelectState option:selected').val();
            var PartyPin = $('#PartyPin').val();
            var PartyPOC = $('#PartyPOC').val();
            var PartyPhone = $('#PartyPhone').val();
            var PartyEmail = $('#PartyEmail').val();
            var data = [PartyAdrId, PartyId, PartyAdrType, PartyGSTIN, PartyAdr, PartyState, PartyStateCode, PartyPin, PartyPOC, PartyPhone, PartyEmail];
            AddOrUpdateBranch(...data).then(result => alert(result));;
        }
    });

    $('#SelectParty').on('change', function (e) {
        var SelectedPartyID = this.value;
        GetPartyDetails(SelectedPartyID).then(rows => {
            var row = rows[0];
            $('#PartyId').val(row.id);
            $("#PartyName").html("Selected Party: " + row.PartyName);
            $("#PartyPAN").html("PAN: " + row.PartyPAN);
        });
        var adrlist = '<option></option>';
        ListOfBranchesWithSelId(SelectedPartyID).then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                adrlist += '<option value="' + row.id + '">' + row.id + '. ' + row.PartyAdrType + '</option>';
            }
            $('#AdrIdList').html(adrlist);
            ClearAll()
        })
    });

    $('#AdrIdList').on('change', function (e) {
        var SelectedAdrID = this.value;
        GetBranchDetails(SelectedAdrID).then(rows => {
            var row = rows[0];
            PartyAdrId = parseInt(row.id);
            $("#PartyGSTIN").val(row.PartyGSTIN);
            $("#PartyAdr").val(row.PartyAdr);
            $("#PartyAdrType").val(row.PartyAdrType).trigger("change");
            $("#SelectState").val(row.PartyStateCode).trigger("change");
            $("#statecode").val(row.PartyStateCode);
            $("#PartyPin").val(row.PartyPin);
            $("#PartyPOC").val(row.PartyPOC);
            $("#PartyPhone").val(row.PartyPhone);
            $("#PartyEmail").val(row.PartyEmail);
        });
    });

});
