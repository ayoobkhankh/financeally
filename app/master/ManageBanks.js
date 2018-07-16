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

    // pool.getConnection(function(err, connection) {

    // async function GetProductList() {
    //     var productlist = '<option></option>';
    //     ListOfProducts().then(rows => {
    //         for (var i = 0; i < rows.length; i++) {
    //             var row = rows[i];
    //             productlist += '<option value="' + row.id + '">' + row.id + ' . ' + row.ProductName + '</option>';
    //         }
    //         $('#SelectProduct').html(productlist);
    //     });
    // };

    // async function GetTaxList() {
    //     var taxlist = '<option></option>';
    //     await ListOfTaxes().then(rows => {
    //         for (var i = 0; i < rows.length; i++) {
    //             var row = rows[i];
    //             taxlist += '<option value="' + row.id + '">' + row.id + ' . ' + row.TaxName + '</option>';
    //         }
    //     });
    //     $('#TaxClass').html(taxlist);
    // };

    // GetProductList();
    // GetTaxList();

    // $('#TaxClass').on('change', function (e) {
    //     var SelectedTaxID = this.value;
    //     GetTaxDetails(SelectedTaxID).then(rows => {
    //         var row = rows[0];
    //         $('#IGSTRate').val(row.IGSTRate);
    //         $("#CGSTRate").val(row.CGSTRate);
    //         $("#SGSTRate").val(row.SGSTRate);
    //         $("#CESSRate").val(row.CESSRate);
    //     });
    // });

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

    // $(":checkbox").change(function () {
    //     if ($(this).is(':checked')) {
    //         $('#SelectProduct').prop("disabled", true);
    //         $('#RefreshProList').prop("disabled", true);
    //         ClearAll();
    //     } else {
    //         $('#SelectProduct').prop("disabled", false);
    //         $('#RefreshProList').prop("disabled", false);
    //         $("#ProductId").val('');
    //     }
    // });

    // $("#RefreshProList").click(function () {
    //     GetProductList();
    // });

    // $('#SelectProduct').on('change', function (e) {
    //     var SelectedProductID = this.value;
    //     GetProductDetails(SelectedProductID).then(rows => {
    //         var row = rows[0];
    //         $('#ProductId').val(row.id);
    //         $("#ProductName").val(row.ProductName);
    //         $("#ProductDesc").val(row.ProductDesc);
    //         $("#ProductType").val(row.ProductCodeType).trigger("change");
    //         $('#ProductCode').val(row.ProductCode);
    //         $("#TaxClass").val(row.TaxClassId).trigger("change");
    //         $("#MeasureUnit").val(row.MeasureUnitShort).trigger("change");
    //         $("#SalePrice").val(row.SalePrice);
    //     });
    // });


    // $("#SaveProduct").click(function () {
    //     $('#ManagePrdFrm').parsley().validate();
    //     if ($('#ManagePrdFrm').parsley().isValid()) {
    //         var ProductId = $('#ProductId').val();
    //         var NewProductId
    //         if (ProductId == "") {
    //             NewProductId = 0
    //         } else NewProductId = ProductId;
    //         var ProductName = $('#ProductName').val();
    //         var ProductDesc = $('#ProductDesc').val();
    //         var ProductType = $('#ProductType option:selected').text();
    //         var ProductCodeType = $('#ProductType option:selected').val();
    //         var ProductCode = $('#ProductCode').val();
    //         var TaxClassId = $('#TaxClass option:selected').val();
    //         var MeasureUnit = $('#MeasureUnit option:selected').text();
    //         var MeasureUnitShort = $('#MeasureUnit option:selected').val();
    //         var SalePrice = $('#SalePrice').val();
    //         var data = [NewProductId, ProductName, ProductDesc, ProductType, ProductCodeType, ProductCode, TaxClassId, MeasureUnit, MeasureUnitShort, SalePrice];
    //         AddOrUpdateProduct(...data).then(result => alert(result));
    //     }
    // });

});