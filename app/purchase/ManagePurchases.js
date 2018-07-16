$(document).ready(function () {

    //hide scroll bars
    $("body").css("overflow", "hidden");

    const ipc = require('electron').ipcRenderer;

    $('#SelectParty').prop("disabled", true);
    $('#RefreshPartList').prop("disabled", true);

    var fs = require("fs");
    var path = require('path');

    //load measurement units
    var measurelistfile = path.join(__dirname, '../../config/stockunitlist.json');
    var jsonmeasurelist = fs.readFileSync(measurelistfile);
    var measurelist = JSON.parse(jsonmeasurelist);
    // console.log(statelist);

    var units = '<option></option>';
    for (var i = 0; i < measurelist.length; i++) {
        units += '<option value="' + measurelist[i].unit_short_name + '">' + measurelist[i].unit_name + '</option>';
    }

    $('#MeasureUnit').html(units);

    $('#SaleListTbl').dataTable({
        "bLengthChange": false,
        pageLength: 5,
        "bFilter": false,
        "autoWidth": false,
        "columns": [{
                "width": "3%"
            },
            {
                "width": "26%"
            },
            {
                "width": "8%"
            },
            {
                "width": "7%"
            },
            {
                "width": "11%"
            }, {
                "width": "10%"
            }, {
                "width": "11%"
            }, {
                "width": "4%"
            },
        ]
    });

    $("#SelectVendor").select2({
        placeholder: "Select Vendor",
        allowClear: true,
        dropdownAutoWidth: true,
        width: '100%'
    });

    $("#SelectProduct").select2({
        placeholder: "Select Item",
        allowClear: true,
        dropdownAutoWidth: true,
        width: '100%'
    });

    $("#MeasureUnit").select2({
        placeholder: "Measure Unit",
        allowClear: true,
        dropdownAutoWidth: true,
        width: '100%'
    });

    $("#TaxClass").select2({
        placeholder: "Tax Class",
        allowClear: true,
        dropdownAutoWidth: true,
        width: '100%'
    });

    var PartyId;
    var PurId, ProductId, ProductCode, ProductName, ProductType, MeasureUnit, MeasureUnitShort, TaxClassId, SGSTRate, CGSTRate, IGSTRate, CESSRate, SGSTAmt, CGSTAmt, IGSTAmt, CESSAmt, TaxTotal, ItemTotal;
    var CurMonth, Year1, Year2, NewInvoiceNo, VendorID, VendorName, BillFroStateCode, BranchCode, BillToStateCode;
    var PurList = [];
    var obj = {};
    var nowdate = moment().format('DD/MM/YYYY');

    function calculate() {
        if (BillFroStateCode == BillToStateCode) {
            IGSTRate = 0;
        } else {
            SGSTRate = 0;
            CGSTRate = 0;
        };
        var quantity = $('#Qty').val();
        var price = $('#PricePerUnit').val();
        var gross = +((quantity * price).toFixed(2));
        $('#Gross').val(gross);
        SGSTAmt = +((gross * SGSTRate / 100).toFixed(2));
        CGSTAmt = +((gross * CGSTRate / 100).toFixed(2));
        IGSTAmt = +((gross * IGSTRate / 100).toFixed(2));
        CESSAmt = +((gross * CESSRate / 100).toFixed(2));
        TaxTotal = +((SGSTAmt + CGSTAmt + IGSTAmt + CESSAmt).toFixed(2));
        $('#sgstr').text(SGSTRate + "%");
        $('#sgstamt').text(SGSTAmt);
        $('#cgstr').text(CGSTRate + "%");
        $('#cgstamt').text(CGSTAmt);
        $('#igstr').text(IGSTRate + "%");
        $('#igstamt').text(IGSTAmt);
        $('#cessr').text(CESSRate + "%");
        $('#cessamt').text(CESSAmt);
        ItemTotal = +((gross + TaxTotal).toFixed(2));
        $('#NetTotal').val(ItemTotal);
    };

    arr1 = [];
    arr2 = [];

    ipc.on('RecievedSalesId', function (event, arg) {
        var InvId = arg;

        GetSalesSummary(InvId, function (rows) {
            var row = rows[0];
            $("#SelectCustomer").val(row.VendorID).trigger("change");
            $("#BillFroAdrIdList").val(row.BillFroId).trigger("change");
            $('#InvDate').val(moment(row.InvDate).format('DD/MM/YYYY'));
            $('#InvDate').prop("disabled", true);
            $('#InvoiceNo').val(row.InvoiceNo);
            SalesId = row.SalesId;
            setTimeout(function () {
                $("#BillFroAdrIdList").val(row.BillToId).trigger("change");
                $("#ShipToAdrIdList").val(row.ShipToId).trigger("change");
            }, 100);
        })

        GetSalesDetails(InvId, function (rows) {
            var obj = {};
            PurList = [];
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                obj = {
                    ProductId: row.ProductId,
                    ProductName: row.ProductName,
                    ProductCode: row.ProductCode,
                    ProductType: row.ProductType,
                    PricePerUnit: row.PricePerUnit,
                    Qty: row.Qty,
                    MeasureUnit: row.MeasureUnit,
                    MeasureUnitShort: row.MeasureUnitShort,
                    Gross: row.Gross,
                    TaxClassId: row.TaxClassId,
                    SGSTRate: row.SGSTRate,
                    SGSTAmt: row.SGSTAmt,
                    CGSTRate: row.CGSTRate,
                    GSTAmt: row.CGSTAmt,
                    IGSTRate: row.IGSTRate,
                    IGSTAmt: row.IGSTAmt,
                    CESSRate: row.CessRate,
                    CESSAmt: row.CessAmt,
                    TaxTotal: row.TaxTotal,
                    ItemTotal: row.ItemTotal
                };
                PurList.push(obj);
            }
            MakeList(PurList);
        })
    });

    $('input[type=radio][name=group1]').change(function () {
        if (this.value == 'newitem') {
            $('#SelectProduct').prop("disabled", true);
            $('#Pdtname').prop("disabled", false);
            $('#ProductType').prop("disabled", false);
            $('#MeasureUnit').prop("disabled", false);
            $('#TaxClass').prop("disabled", false);
            $('#pdtcode').prop("disabled", false);
            $('#NewItemSet').prop("disabled", false);
            $('#SelectProduct').val("").trigger("change");

        } else if (this.value == 'exitem') {
            $('#SelectProduct').prop("disabled", false);
            $('#Pdtname').prop("disabled", true);
            $('#ProductType').prop("disabled", true);
            $('#MeasureUnit').prop("disabled", true);
            $('#TaxClass').prop("disabled", true);
            $('#pdtcode').prop("disabled", true);
            $('#NewItemSet').prop("disabled", true);
            $('#Pdtname').val("");
            $('#MeasureUnit').val("").trigger("change");
            $('#TaxClass').val("").trigger("change");
            $('#pdtcode').val("");
            $('#MeasureUnitDisplay').text("Units");
            $('#MeasureUnitDisplayPrice').text("Per Units");
        }
    });

    $('#InvDate').daterangepicker({
        locale: {
            format: "DD/MM/YYYY",
        },
        singleDatePicker: true,
        showDropdowns: true,
        calender_style: "picker_1"
    }, function (start, end, label) {
        var nowdate = (start.format('DD/MM/YYYY'));
    });

    function GetPartyList() {
        var partylist = '<option></option>';
        ListOfParty(function (rows) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                partylist += '<option value="' + row.PartyId + '">' + row.PartyId + ' . ' + row.PartyName + '</option>';
            }
            $('#SelectVendor').html(partylist);
        });
    };

    GetPartyList()

    function GetProductList() {
        var productlist = '<option></option>';
        ListOfProducts(function (rows) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                productlist += '<option value="' + row.ProductId + '">' + row.ProductId + ' . ' + row.ProductName + '</option>';
            }
            $('#SelectProduct').html(productlist);
        });
    };

    GetProductList();

    function GetTaxList() {
        var taxlist = '<option></option>';
        ListOfTaxes(function (rows) {
            // console.log(rows);
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                taxlist += '<option value="' + row.TaxId + '">' + row.TaxId + ' . ' + row.TaxName + '</option>';
            }
            // console.log(taxlist);
            $('#TaxClass').html(taxlist);
        })
    };

    GetTaxList();

    $('#TaxClass').on('change', function (e) {
        TaxClassId = this.value;
        if (TaxClassId != 0) {
            GetTaxDetails(TaxClassId, function (rows) {
                var row = rows[0];
                IGSTRate = row.IGSTRate;
                CGSTRate = row.CGSTRate;
                SGSTRate = row.SGSTRate;
                CESSRate = row.CESSRate;
            });
        };
    });

    $('#SelectProduct').on('change', function (e) {
        var SelectedProductID = this.value;
        GetProductDetails(SelectedProductID, function (rows) {
            var row = rows[0];
            ProductId = row.ProductId;
            ProductName = row.ProductName;
            ProductCode = row.ProductCode;
            ProductType = row.ProductType;
            TaxClassId = row.TaxClassId;
            producttaxid = row.TaxClassId;
            $('#Qty').val(1);
            MeasureUnit = row.MeasureUnit;
            MeasureUnitShort = row.MeasureUnitShort;
            $('#MeasureUnitDisplay').text(row.MeasureUnit);
            $('#MeasureUnitDisplayPrice').text("Per " + row.MeasureUnitShort);
            $('#PricePerUnit').val(row.SalePrice);
            // $('#AddToCart').prop("disabled", false);
            GetTaxDetails(producttaxid, function (rows) {
                var row = rows[0];
                IGSTRate = row.IGSTRate;
                CGSTRate = row.CGSTRate;
                SGSTRate = row.SGSTRate;
                CESSRate = row.CESSRate;
                calculate();
            })
        });

    });

    $('#MeasureUnit').on('change', function (e) {
        MeasureUnit = $('#MeasureUnit option:selected').text();
        MeasureUnitShort = $('#MeasureUnit option:selected').val();
        $('#MeasureUnitDisplay').text(MeasureUnitShort);
        $('#MeasureUnitDisplayPrice').text("Per " + MeasureUnitShort);
    })

    $("#NewItemSet").click(function () {
        ProductId = 0;
        ProductName = $('#Pdtname').val();
        ProductCode = $('#pdtcode').val();
        ProductType = $('#ProductType option:selected').text();
        $('#Qty').val(1);
    });

    $('#SelectVendor').on('change', function (e) {
        var SelectedPartyID = this.value;
        GetPartyDetails(SelectedPartyID, function (rows) {
            var row = rows[0];
            $('#BillFroVendNameLbl').text(row.PartyName);
            VendorName = row.PartyName;
            VendorID = parseInt(row.PartyId);
        });
        var taxlist = '';
        ListOfBranchesWithSelId(SelectedPartyID, function (rows) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                taxlist += "<option value=" + row.PartyAdrId + ">" + (i + 1) + ". " + row.PartyAdrType + "</option>";
            }
            $('#BillFroAdrIdList').html(taxlist);
            $("#BillFroAdrIdList").prop('selectedIndex', 0).trigger("change");
        })

    });

    $('#Qty').on('keyup keypress blur change', function (e) {
        calculate();
    });

    $('#PricePerUnit').on('keyup keypress blur change', function (e) {
        calculate();
    });

    $('#BillToAdrIdList').on('change', function (e) {
        var SelectedSelfAdrID = this.value;
        GetSelectedAddressDetails(SelectedSelfAdrID, function (rows) {
            var row = rows[0];
            $('#BillToAdrLbl').text(row.Address + ", " + row.State);
            $('#BillToGSTINLbl').text("GSTIN: " + row.GSTIN);
            $('#BillToStateCodeLbl').text("State Code: " + row.StateCode);
            BillToStateCode = parseInt(row.StateCode);
            BillToId = parseInt(row.SelfAdrId);
            BranchCode = row.BranchCode;
        });
    });

    $('#BillFroAdrIdList').on('change', function (e) {
        var SelectedAdrID = this.value;
        // var SelectedAdrID = 3;
        GetBranchDetails(SelectedAdrID, function (rows) {
            var row = rows[0];
            $('#BillFroVendAdrLbl').text(row.PartyAdr + ", " + row.PartyState);
            $('#BillFroVendGSTINLbl').text("GSTIN: " + row.PartyGSTIN);
            $('#BillFroVendStateCodeLbl').text("State Code: " + row.PartyStateCode);
            BillFroStateCode = parseInt(row.PartyStateCode);
        });
        // alert(this.value);
    });

    function LoadSelfData() {
        GetSelfDetails(function (rows) {
            var row = rows[0];
            $("#BillToNameLbl").html(row.SelfName);
        });
        var list = '';
        ListOfAddresses(function (rows) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                list += '<option value="' + row.SelfAdrId + '">' + i + '. ' + row.AddressType + '</option>';
            }
            $('#BillToAdrIdList').html(list);
            $("#BillToAdrIdList").prop('selectedIndex', 0).trigger("change");
        })
    }

    LoadSelfData();

    $('#ManageCustFrm').on('click', '.delrow', function () {
        var rowidtodel = ($(this).attr("id"));
        // var rowtodel = +(rowidtodel.slice(3, 10));
        // alert((parseInt(rowidtodel)) - 1);
        PurList.splice((rowidtodel - 1), 1)
        MakeList(PurList);
    });

    $("#ShowSearchSales").click(function () {
        ipc.send('ShowSearchSales', 'ping')
    });

    $("#PrevPrintInvoice").click(function () {
        ipc.send('PrevPrintInvoice', SalesId);
        // alert('Hi');
    });

    $("#AddToCart").click(function () {
        var PricePerUnit = parseFloat($('#PricePerUnit').val());
        var Qty = parseFloat($('#Qty').val());
        var Gross = parseFloat($('#Gross').val());
        var ItemTotal = parseFloat($('#NetTotal').val());
        var obj = {
            ProductId: ProductId,
            ProductName: ProductName,
            ProductCode: ProductCode,
            ProductType: ProductType,
            PricePerUnit: PricePerUnit,
            Qty: Qty,
            MeasureUnit: MeasureUnit,
            MeasureUnitShort: MeasureUnitShort,
            Gross: Gross,
            TaxClassId: TaxClassId,
            SGSTRate: SGSTRate,
            SGSTAmt: SGSTAmt,
            CGSTRate: CGSTRate,
            CGSTAmt: CGSTAmt,
            IGSTRate: IGSTRate,
            IGSTAmt: IGSTAmt,
            CESSRate: CESSRate,
            CESSAmt: CESSAmt,
            TaxTotal: TaxTotal,
            ItemTotal: ItemTotal
        }

        PurList.push(obj);
        MakeList(PurList);
    });

    function MakeList(arr) {
        var table = $('#SaleListTbl').dataTable();
        table.fnClearTable();
        table.fnDestroy();
        var list = "";
        var GrossTotToDisplay = 0;
        var TaxTotToDisplay = 0;
        var NetTotToDisplay = 0;
        for (var i = 0; i < arr.length; i++) {
            var row = arr[i];
            list += "<tr id=''><th scope='row'>" + (i + 1) + "</th><td>" + row.ProductName + "</td><td class='amttd'>" + row.Qty + " " + row.MeasureUnitShort + "</td><td class='amttd'>" + row.PricePerUnit + "</td><td class='amttd'>" + row.Gross + "</td><td class='amttd'>" + row.TaxTotal + "</td><td class='amttd'>" + row.ItemTotal + "</td><td class='amttd'><a href='#' class='delrow' id='" + (i + 1) + "' ><i class='fa fa-times' aria-hidden='true'></i></a></td></tr>";
            GrossTotToDisplay += row.Gross;
            TaxTotToDisplay += row.TaxTotal;
            NetTotToDisplay += row.ItemTotal;
        }
        $('#ListTblBody').html(list);
        var table = $('#SaleListTbl').dataTable({
            pageLength: 5,
            "bLengthChange": false,
            "bFilter": false
        });
        $('#GrossTotLbl').text(GrossTotToDisplay.toFixed(2));
        $('#TaxTotLbl').text(TaxTotToDisplay.toFixed(2));
        $('#NetTotLbl').text(NetTotToDisplay.toFixed(2));
    }

    $("#SavePurInvoice").click(function () {
        var InvDate = $('#InvDate').val();
        var PONo = $('#PONo').val();
        var InvoiceNo = $('#InvoiceNo').val();
        var SaleType = $('#SaleType option:selected').val();
        var RCM = $('#RCM option:selected').val();
        var momentObj = moment(InvDate, 'DD/MM/YYYY');
        var NewInvDate = moment(momentObj).format('YYYY-MM-DD')
        var InvMonth = (parseInt(InvDate.slice(3, 5)));
        var InvYear = (parseInt(InvDate.slice(6, 10)));
        var BillFroId = parseInt($('#BillFroAdrIdList option:selected').val());
        var NewPurId;
        if (PurId == undefined) {
            NewPurId = 0
        } else NewPurId = PurId;
        // var ShipToId = parseInt($('#ShipToAdrIdList option:selected').val());
        var VendorDetails = [];
        var obj = {
            PurId: NewPurId,
            InvYear: InvYear,
            InvMonth: InvMonth,
            BillFroId: BillFroId,
            BillToId: BillToId,
            BranchCode: BranchCode,
            VendorID: VendorID,
            PONo: PONo,
            InvoiceNo: InvoiceNo,
            InvDate: NewInvDate,
            BillFroStateCode: BillFroStateCode,
            BillToStateCode: BillToStateCode,
            VendorName: VendorName,
            RCM: RCM,
            CreatedBy: "Ayoob"
        }
        VendorDetails.push(obj);
        // console.log(VendorDetails);
        SavePurchases(VendorDetails, PurList);
    });
});