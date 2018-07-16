$(document).ready(function () {

    const ipc = require('electron').ipcRenderer

    var FromWindow;
    // $("#SelectProduct").select2({
    //     placeholder: "Select Product",
    //     allowClear: true
    // });

    // $("#ProductType").select2({
    //     placeholder: "Type",
    //     allowClear: true,
    //     minimumResultsForSearch: 5
    // });

    // $("#TaxClass").select2({
    //     placeholder: "Tax Class",
    //     allowClear: true
    // });

    ipc.on('SendFrom', (event, arg) => {
        FromWindow = arg;
        // alert(arg);
        $(document).attr("title", "Search Sales : Request from " + arg);
    })

    $("#SelectField").select2({
        placeholder: "Field",
        allowClear: true
    });

    $('#datatable').dataTable({
        pageLength: 5
    });

    //hide scroll bars
    $("body").css("overflow", "hidden");

    // var fs = require("fs");
    // var path = require('path');

    // //load measurement units
    // var measurelistfile = path.join(__dirname, '../../config/stockunitlist.json');
    // var jsonmeasurelist = fs.readFileSync(measurelistfile);
    // var measurelist = JSON.parse(jsonmeasurelist);
    // // console.log(statelist);

    // var units = '<option></option>';
    // for (var i = 0; i < measurelist.length; i++) {
    //     units += '<option value="' + measurelist[i].unit_short_name + '">' + measurelist[i].unit_name + '</option>';
    // }

    // $('#MeasureUnit').html(units);

    // $('#SelectParty').prop("disabled", true);
    // $('#RefreshPartList').prop("disabled", true);

    // $('[data-toggle="tooltip"]').tooltip();

    // $('#InvDateFrom').daterangepicker({
    //     locale: {
    //         format: "DD/MM/YYYY",
    //     },
    //     singleDatePicker: true,
    //     showDropdowns: true,
    //     calender_style: "picker_1"
    // }, function (start, end, label) {
    //     var nowdate = (start.format('DD/MM/YYYY'));
    // });

    // $('#InvDateTo').daterangepicker({
    //     locale: {
    //         format: "DD/MM/YYYY",
    //     },
    //     singleDatePicker: true,
    //     showDropdowns: true,
    //     calender_style: "picker_1"
    // }, function (start, end, label) {
    //     var nowdate = (start.format('DD/MM/YYYY'));
    // });

    var startdate, enddate;

    $('#reservation').daterangepicker({
        startDate: moment().startOf('month'),
        endDate: moment(),
        locale: {
            format: "DD/MM/YYYY",
        },
        singleDatePicker: false,
        showDropdowns: true,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf(
                'month')]
        },
        opens: 'right',
        buttonClasses: ['btn btn-info'],
        applyClass: 'btn-sm btn-success',
        cancelClass: 'btn-sm btn-danger',
        separator: ' to ',
        calender_style: "picker_1"
    }, function (start, end, label) {
        startdate = (start.format('YYYY-MM-DD'));
        enddate = (end.format('YYYY-MM-DD'));
    });
    // window.Parsley.on('field:error', function (fieldInstance) {
    //     fieldInstance.$element.popover({
    //         trigger: 'manual',
    //         container: 'body',
    //         placement: 'auto',
    //         html: true,
    //         title: 'Error! <a href="#" class="close" data-dismiss="alert"><i class="fa fa-times-circle" aria-hidden="true"></i></a>   ',
    //         content: function () {
    //             return fieldInstance.getErrorsMessages().join(';');
    //         }
    //     }).popover('show');

    // });

    // window.Parsley.on('field:success', function (fieldInstance) {
    //     fieldInstance.$element.popover('destroy');
    // });

    // $(document).on("click", ".popover .close", function () {
    //     $(this).parents(".popover").popover('hide');
    // });

    // pool.getConnection(function(err, connection) {

    // function GetProductList() {
    //     var productlist = '<option></option>';
    //     ListOfProducts(function (rows) {
    //         for (var i = 0; i < rows.length; i++) {
    //             var row = rows[i];
    //             productlist += '<option value="' + row.ProductId + '">' + row.ProductId + ' . ' + row.ProductName + '</option>';
    //         }
    //         $('#SelectProduct').html(productlist);
    //     });
    // };

    // GetProductList();

    // function GetTaxList() {
    //     var taxlist = '<option></option>';
    //     ListOfTaxes(function (rows) {
    //         // console.log(rows);
    //         for (var i = 0; i < rows.length; i++) {
    //             var row = rows[i];
    //             taxlist += '<option value="' + row.TaxId + '">' + row.TaxId + ' . ' + row.TaxName + '</option>';
    //         }
    //         // console.log(taxlist);
    //         $('#TaxClass').html(taxlist);
    //     })
    // };

    // GetTaxList();
    // //     GetProductList();
    // //     GetNewProductID();

    // $('#TaxClass').on('change', function (e) {
    //     var SelectedTaxID = this.value;
    //     if (SelectedTaxID != 0) {
    //         GetTaxDetails(SelectedTaxID, function (rows) {
    //             var row = rows[0];
    //             $('#IGSTRate').val(row.IGSTRate);
    //             $("#CGSTRate").val(row.CGSTRate);
    //             $("#SGSTRate").val(row.SGSTRate);
    //             $("#CESSRate").val(row.CESSRate);
    //         });
    //     };
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

    //     $("#SaveProduct").click(function() {
    //         $('#ManagePrdFrm').parsley().validate();
    //         if ($('#ManagePrdFrm').parsley().isValid()) {
    //             var ProductId = $('#ProductId').val();
    //             var ProductName = $('#ProductName').val();
    //             var ProductDesc = $('#ProductDesc').val();
    //             var ProductType = $('#ProductType option:selected').text();
    //             var ProductCodeType = $('#ProductType option:selected').val();
    //             var ProductCode = $('#ProductCode').val();
    //             var TaxClassId = $('#TaxClass option:selected').val();
    //             var MeasureUnit = $('#MeasureUnit option:selected').text();
    //             var MeasureUnitShort = $('#MeasureUnit option:selected').val();
    //             var SalePrice = $('#SalePrice').val();

    //             var data = {
    //                 ProductId: ProductId,
    //                 ProductName: ProductName,
    //                 ProductDesc: ProductDesc,
    //                 ProductType: ProductType,
    //                 ProductCodeType: ProductCodeType,
    //                 ProductCode: ProductCode,
    //                 TaxClassId: TaxClassId,
    //                 MeasureUnit: MeasureUnit,
    //                 MeasureUnitShort: MeasureUnitShort,
    //                 SalePrice: SalePrice
    //             };

    //             connection.query('SELECT ProductId FROM products WHERE ProductId=' + ProductId, function(err, results, rows) {
    //                 if (err) {
    //                     console.log(err);
    //                 };
    //                 var numrows = results.length;
    //                 // console.log(numrows);
    //                 if (numrows == 0) {
    //                     connection.query('INSERT INTO products SET?', data, function(err, result) {
    //                         if (err) {
    //                             console.log(err);
    //                         };
    //                         alert('Product: ' + ProductName + ' saved!');
    //                         UpdateProductID();
    //                         GetNewProductID();
    //                         ClearAll();
    //                     });
    //                 } else {
    //                     connection.query('UPDATE products SET? WHERE ProductId=' + ProductId, data, function(err, result) {
    //                         if (err) {
    //                             console.log(err);
    //                         };
    //                         alert('Product: ' + ProductName + ' Updated');
    //                         UpdateProductID();
    //                         GetNewProductID();
    //                         ClearAll();
    //                     });
    //                 };
    //             });
    //         };
    //     });

    $("#SearchSales").click(function () {
        var list = "";
        // var InvDateFrom = $('#InvDateFrom').val();
        // var InvDateTo = $('#InvDateTo').val();
        // var momentObj1 = moment(InvDateFrom, 'DD/MM/YYYY');
        // var momentObj2 = moment(InvDateTo, 'DD/MM/YYYY');
        // var datediff = momentObj2.diff(momentObj1, 'days');

        // var NewInvDateFrom = moment(momentObj1).format('YYYY-MM-DD')
        // var NewInvDateTo = moment(momentObj2).format('YYYY-MM-DD')
        SearchSales(startdate, enddate, 0, 0).then(rows => {
            console.log(rows);
            var table = $('#datatable').dataTable();
            table.fnClearTable();
            table.fnDestroy();
            // $('#datatable').empty();
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                list += "<tr id=''><th scope='row'>" + (i + 1) + "</th><td>" + row.InvoiceNo + " </th><td>" + row.InvDate + "</td><td>" + row.VendorName + "</td><td class='amttd'>" + row.GrossTotal + "</td><td class='amttd'>" + row.TaxTotal + "</td><td class='amttd'>" + row.Total + "</td><td class='amttd'><a href='#' class='selrow' id='" + row.id + "' >Select</a></td></tr>";
            }
            $('#ListTblBody').html(list);
            var table = $('#datatable').dataTable({
                pageLength: 5
            });

            // $('#datatable').data.reload();
            // table = $('#datatable').DataTable({
            // });

            // table.destroy();

            // table = $('#datatable').DataTable({
            //     pageLength: 5
            // });
        });
    });

    $(document).on('click', '.selrow', function () {
        var SalesId = parseInt($(this).attr('id'));
        var arr = [];
        var obj = {
            window: FromWindow,
            SalesId: SalesId
        }
        arr.push(obj);
        ipc.send('GetSalesId', arr);
    });

    // $(body).click(function (fieldInstance) {
    //     fieldInstance.$element.popover('destroy');
    // });

    // $('#SelectProduct').on('change', function (e) {
    //     var SelectedProductID = this.value;
    //     GetProductDetails(SelectedProductID, function (rows) {
    //         var row = rows[0];
    //         $('#ProductId').val(row.ProductId);
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
    //         AddOrUpdateProduct(NewProductId, ProductName, ProductDesc, ProductType, ProductCodeType, ProductCode, TaxClassId, MeasureUnit, MeasureUnitShort, SalePrice, "Ayoob")
    //     }
    // });

});