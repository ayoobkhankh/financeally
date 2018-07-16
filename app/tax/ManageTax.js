$(document).ready(function () {

    //hide scroll bars
    $("body").css("overflow", "hidden");

    $('#SelectTax').prop("disabled", true);
    $('#RefreshTaxList').prop("disabled", true);

    $("#SelectTax").select2({
        placeholder: "Select Tax",
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

    function ClearAll() {
        $("#TaxId").val("");
        $("#TaxName").val("");
        $("#TaxDesc").val("");
        $("#IGSTRate").val("");
        $("#CGSTRate").val("");
        $("#SGSTRate").val("");
        $("#CESSRate").val("");
    };

    $(":checkbox").change(function () {
        if ($(this).is(":checked")) {
            $("#SelectTax").prop("disabled", true);
            $("#RefreshTaxList").prop("disabled", true);
            ClearAll();
        } else {
            $("#SelectTax").prop("disabled", false);
            $("#RefreshTaxList").prop("disabled", false);
            $("#TaxId").val("");
        }
    });

    $("#RefreshTaxList").click(function () {
        GetTaxList();
    });

    $("#SaveTax").click(function () {
        $('#ManageTaxFrm').parsley().validate();
        if ($('#ManageTaxFrm').parsley().isValid()) {
            var TaxId = $('#TaxId').val();
            var NewTaxId;
            if (TaxId == "" || typeof TaxId == 'undefined') {
                NewTaxId = 0;
            } else NewTaxId = parseInt(TaxId);
            var TaxName = $('#TaxName').val();
            var TaxDesc = $('#TaxDesc').val();
            var IGSTRate = $('#IGSTRate').val();
            var CGSTRate = $('#CGSTRate').val();
            var SGSTRate = $('#SGSTRate').val();
            var CESSRate = $('#CESSRate').val();
            var data = [NewTaxId, TaxName, TaxDesc, CGSTRate, SGSTRate, IGSTRate, CESSRate];
            AddOrUpdateTax(...data).then(result => alert(result));
        }
    });

    async function GetTaxList() {
        var taxlist = '<option></option>';
        await ListOfTaxes().then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                taxlist += '<option value="' + row.id + '">' + row.id + ' . ' + row.TaxName + '</option>';
            }
        });
        $('#SelectTax').html(taxlist);
    };

    $('#SelectTax').on('change', function (e) {
        var SelectedTaxID = this.value;
        GetTaxDetails(SelectedTaxID).then(rows => {
            var row = rows[0];
            $('#TaxId').val(row.id);
            $("#TaxName").val(row.TaxName);
            $("#TaxDesc").val(row.TaxDesc);
            $("#IGSTRate").val(row.IGSTRate);
            $("#CGSTRate").val(row.CGSTRate);
            $("#SGSTRate").val(row.SGSTRate);
            $("#CESSRate").val(row.CESSRate);
        })
    });

    GetTaxList();
});