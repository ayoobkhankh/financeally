$(document).ready(function () {

    //hide scroll bars
    $("body").css("overflow", "hidden");

    // var fs = require("fs");
    // var path = require('path');
    const ipc = require('electron').ipcRenderer;

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

    $('#SelectParty').prop("disabled", true);
    $('#RefreshPartList').prop("disabled", true);
    // $('#AddToCart').prop("disabled", true);

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

    $("#SelectCustomer").select2({
        placeholder: "Select Customer",
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

    $("#RCM").select2({
        allowClear: false,
        dropdownAutoWidth: true,
        width: '100%'
    });

    $("#InvFormat").select2({
        allowClear: false,
        dropdownAutoWidth: true,
        width: '100%'
    });

    $("#SaleType").select2({
        allowClear: false,
        dropdownAutoWidth: true,
        width: '100%'
    });

    $("#SelectedBankId").select2({
        allowClear: false,
        dropdownAutoWidth: true,
        width: '100%'
    });

    $("#ProductType").select2({
        allowClear: false,
        dropdownAutoWidth: true,
        width: '100%'
    });

    var PartyId;
    var SalesId, ProductId, ProductCode, ProductName, ProductType, MeasureUnit, MeasureUnitShort, TaxClassId, SGSTRate, CGSTRate, IGSTRate, CESSRate, SGSTAmt, CGSTAmt, IGSTAmt, CESSAmt, TaxTotal, ItemTotal;
    var CustomerID, CustomerName, BillFroStateCode, BranchCode, BillToStateCode;
    var details = [];
    var obj = {};
    var nowdate = moment().format('DD/MM/YYYY');

    function calculate() {
        if (BillFroStateCode === BillToStateCode) {
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
        SalesId = parseInt(arg);
        // console.log(SalesId);
        GetSalesData(SalesId).then(data => {
            $("#SelectCustomer").val(data.summary.VendorID).trigger("change");
            $("#BillFroAdrIdList").val(data.summary.BillFroId).trigger("change");
            $('#InvDate').val(moment(data.summary.InvDate).format('DD/MM/YYYY'));
            $('#InvDate').prop("disabled", true);
            $('#InvoiceNo').val(data.summary.InvoiceNo);
            details = data.details;
            MakeList(details);
            setTimeout(function () {
                $("#BillToAdrIdList").val(data.summary.BillToId).trigger("change");
                $("#ShipToAdrIdList").val(data.summary.ShipToId).trigger("change");
            }, 100);
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

    async function GetPartyList() {
        var partylist = '<option></option>';
        await ListOfParty().then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                partylist += '<option value="' + row.id + '">' + row.id + ' . ' + row.PartyName + '</option>';
            }
        });
        $('#SelectCustomer').html(partylist);
    };

    GetPartyList()

    async function GetProductList() {
        var productlist = '<option></option>';
        await ListOfProducts().then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                productlist += '<option value="' + row.id + '">' + row.id + ' . ' + row.ProductName + '</option>';
            }
        });
        $('#SelectProduct').html(productlist);
    };

    GetProductList();

    async function GetTaxList() {
        var taxlist = '<option></option>';
        await ListOfTaxes().then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                taxlist += '<option value="' + row.id + '">' + row.id + ' . ' + row.TaxName + '</option>';
            }
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
        GetProductDetails(SelectedProductID).then(rows => {
            var row = rows[0];
            ProductId = row.id;
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
            GetTaxDetails(producttaxid).then(rows => {
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

    $('#SelectCustomer').on('change', function (e) {
        var SelectedPartyID = this.value;
        GetPartyDetails(SelectedPartyID).then(rows => {
            var row = rows[0];
            $('#BillToCustNameLbl').text(row.PartyName);
            CustomerName = row.PartyName;
            CustomerID = parseInt(row.id);
        });
        var adrlist = '';
        ListOfBranchesWithSelId(SelectedPartyID).then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                adrlist += "<option value=" + row.id + ">" + (i + 1) + ". " + row.PartyAdrType + "</option>";
            }
            $('#BillToAdrIdList').html(adrlist);
            $("#BillToAdrIdList").prop('selectedIndex', 0).trigger("change");
        })

    });

    $('#Qty').on('keyup keypress blur change', function (e) {
        calculate();
    });

    $('#PricePerUnit').on('keyup keypress blur change', function (e) {
        calculate();
    });

    $('#BillFroAdrIdList').on('change', function (e) {
        var SelectedSelfAdrID = this.value;
        GetSelectedAddressDetails(SelectedSelfAdrID).then(rows => {
            var row = rows[0];
            $('#BillFromCustAdrLbl').text(row.Address + ", " + row.State);
            $('#BillFromCustGSTINLbl').text("GSTIN: " + row.GSTIN);
            $('#BillFromCustStateCodeLbl').text("State Code: " + row.StateCode);
            BillFroStateCode = parseInt(row.StateCode);
            BillFroId = parseInt(row.id);
            BranchCode = row.BranchCode;
        });
    });

    $('#BillToAdrIdList').on('change', function (e) {
        var SelectedAdrID = this.value;
        GetBranchDetails(SelectedAdrID).then(rows => {
            var row = rows[0];
            $('#BillToCustAdrLbl').text(row.PartyAdr + ", " + row.PartyState);
            $('#BillToCustGSTINLbl').text("GSTIN: " + row.PartyGSTIN);
            $('#BillToCustStateCodeLbl').text("State Code: " + row.PartyStateCode);
            BillToStateCode = parseInt(row.PartyStateCode);
        });
    });

    async function LoadSelfData() {
        await GetSelfDetails(1).then(rows => {
            var row = rows[0];
            $("#BillFromCustNameLbl").html(row.SelfName);
        });
        var list = '';
        await ListOfAddresses().then(rows => {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                list += '<option value="' + row.id + '">' + (i + 1) + '. ' + row.AddressType + '</option>';
            }
            $('#BillFroAdrIdList').html(list);
            $("#BillFroAdrIdList").prop('selectedIndex', 0).trigger("change");
        })
    }

    LoadSelfData();

    $('#ManageCustFrm').on('click', '.delrow', function () {
        var rowidtodel = ($(this).attr("id"));
        // var rowtodel = +(rowidtodel.slice(3, 10));
        // alert((parseInt(rowidtodel)) - 1);
        details.splice((rowidtodel - 1), 1)
        MakeList(details);
    });

    $("#ShowSearchSales").click(function () {
        ipc.send('ShowSearchSales', 'POSWindow')
    });

    $("#PrevPrintInvoice").click(function () {
        ipc.send('PrevPrintInvoice', SalesId);
    });

    $("#AddToCart").click(function () {
        var PricePerUnit = parseFloat($('#PricePerUnit').val());
        var Qty = parseFloat($('#Qty').val());
        var Gross = parseFloat($('#Gross').val());
        var ItemTotal = parseFloat($('#NetTotal').val());
        var obj = {
            id: 0,
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

        details.push(obj);
        MakeList(details);
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

    $("#SaveInvoice").click(function () {
        var InvDate = $('#InvDate').val();
        var PONo = $('#InvDate').val();
        var SaleType = $('#SaleType option:selected').val();
        var RCM = $('#RCM option:selected').val();
        var momentObj = moment(InvDate, 'DD/MM/YYYY');
        var NewInvDate = moment(momentObj).format('YYYY-MM-DD')
        var BillToId = parseInt($('#BillToAdrIdList option:selected').val());
        var NewSalesId;
        if (SalesId == "" || typeof SalesId == 'undefined') {
            NewSalesId = 0
        } else NewSalesId = SalesId;
        var InvoiceNo = $('#InvoiceNo').val();
        var summary = {
            id: NewSalesId,
            VendorID: CustomerID,
            BillFroId: BillFroId,
            BranchCode: BranchCode,
            BillToId: BillToId,
            PONo: PONo,
            InvDate: NewInvDate,
            InvoiceNo: InvoiceNo,
            Rawdate: InvDate,
            BillFroStateCode: BillFroStateCode,
            BillToStateCode: BillToStateCode,
            VendorName: CustomerName,
            SaleType: SaleType,
            RCM: RCM,
            SelectedBankId: 1
        };

        var list = { summary, details }
        console.log(list);
        SaveSale(list);
    });
});