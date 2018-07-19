require('../server/ServerActivities')

$(document).ready(function () {

    $("#SelectAccount").select2({
        placeholder: "Select Product",
        allowClear: true,
        dropdownAutoWidth: true,
        width: '100%'
    });

    $("#AccountType").select2({
        placeholder: "Select Product",
        allowClear: true,
        dropdownAutoWidth: true,
        width: '100%'
    });

    //hide scroll bars
    $("body").css("overflow", "hidden");

    $('#SelectAccount').prop("disabled", true);
    $('#RefreshPartList').prop("disabled", true);

    // $('[data-toggle="tooltip"]').tooltip();



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

    async function GetBankList() {
        var banklist = '<option></option>';
        ListOfBankAccounts().then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                banklist += '<option value="' + row.id + '">' + row.id + ' . ' + row.AccountName + '</option>';
            }
            $('#SelectAccount').html(banklist);
        });
    };

    GetBankList();

    // function ClearAll() {
    //     $("#ProductName").val("");
    //     $("#ProductDesc").val("");
    //     $("#ProductType").val("").trigger("change");
    //     $("#ProductCode").val("");
    //     $("#TaxClass").val(0).trigger("change");
    //     $("#IGSTRate").val("");
    //     $("#CGSTRate").val("");
    //     $("#SGSTRate").val("");
    //     $("#CESSRate").val("");
    //     $("#MeasureUnit").val("").trigger("change");
    //     $("#SalePrice").val("");
    // };

    $(":checkbox").change(function () {
        if ($(this).is(':checked')) {
            $('#SelectAccount').prop("disabled", true);
            $('#RefreshBankList').prop("disabled", true);
            ClearAll();
        } else {
            $('#SelectAccount').prop("disabled", false);
            $('#RefreshBankList').prop("disabled", false);
            $("#BankAccId").val('');
        }
    });

    $("#RefreshBankList").click(function () {
        GetBankList();
    });

    $('#SelectAccount').on('change', function (e) {
        var SelectedBankAccID = this.value;
        GetBankAccDetails(SelectedBankAccID).then(rows => {
            var row = rows[0];
            $('#BankAccId').val(row.id);
            $("#AccountName").val(row.AccountName);
            $("#NameInBank").val(row.NameAsPerBank);
            $("#NameOftheBank").val(row.BankName);
            $("#AccountType").val(row.AccountType).trigger("change");
            $('#IFSC').val(row.IFSC);
            $("#Branch").val(row.Branch);
        });
    });

    $("#SaveBankAccount").click(function () {
        $('#ManageBankFrm').parsley().validate();
        if ($('#ManageBankFrm').parsley().isValid()) {
            var BankAccId = $('#BankAccId').val();
            var NewBankAccId
            if (BankAccId == "" || typeof BankAccId == 'undefined') {
                NewBankAccId = 0
            } else NewBankAccId = BankAccId;
            var AccountName = $('#AccountName').val();
            var NameAsPerBank = $('#NameInBank').val();
            var BankName = $('#NameOftheBank').val();
            var AccountType = $('#AccountType option:selected').val();
            var IFSC = $('#IFSC').val();
            var Branch = $('#Branch').val();
            var data = [NewBankAccId, AccountName, NameAsPerBank, BankName, AccountType, IFSC, Branch];
            AddOrUpdateBankAccount(...data).then(result => alert(result));
        }
    });

});