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
