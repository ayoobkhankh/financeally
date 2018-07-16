$(document).ready(function () {

    const ipc = require('electron').ipcRenderer;
    async = require("async");
    var InvId, BillFroId, BillToId;

    ipc.on('SalesIdIs', (event, arg) => {
        InvId = arg;
        GetSelfDetails(1).then(rows => {
            var row = rows[0];
            $("#SelfName").html(row.SelfName);
            $("#SelfPAN").html(row.SelfPAN);
        });
    });

    //     GetSalesSummary(InvId, function (rows) {
    //         var row = rows[0];
    //         $('#InvoiceDate').html(moment(row.InvDate).format('DD/MM/YYYY'));
    //         $('#InvoiceNo').html(row.InvoiceNo);
    //         $('#PONo').html(row.PONo);
    //         $('#SaleType').html(row.SaleType);
    //         $('#RCM').html(row.RCM);
    //         GetPartyDetails(row.VendorID, function (rows) {
    //             var row = rows[0];
    //             $('#BillToCustNameLbl').html(row.PartyName);
    //         });
    //         GetBranchDetails(row.BillToId, function (rows) {
    //             var row = rows[0];
    //             $('#BillToCustAdrLbl').html(row.PartyAdr + ", " + row.PartyState);
    //             $('#BillToCustGSTINLbl').html(row.PartyGSTIN);
    //             $('#BillToCustStateLbl').html(row.PartyState);
    //             $('#BillToCustStateCodeLbl').html(row.PartyStateCode);
    //         });
    //         GetSelectedAddressDetails(row.BillFroId, function (rows) {
    //             var row = rows[0];
    //             $('#BillFromAdrLbl').html(row.Address + ", " + row.State);
    //             $('#BillFromGSTINLbl').html(row.GSTIN);
    //             // // $('#BillFromCustStateCodeLbl').text("State Code: " + row.StateCode);
    //         });
    //         GetSalesDetails(InvId, function (rows) {
    //             var ItemTbl = "";
    //             var ItemListCommon = "";
    //             var ItemListCommonWithCess = "";
    //             var ItemListWithI = "";
    //             var ItemListWithIWithCess = "";
    //             // var ItemListEndCommon = "";

    //             var TotGross = 0;
    //             var TotSgst = 0;
    //             var TotCgst = 0;
    //             var TotIgst = 0;
    //             var TotCess = 0;
    //             var TotTax = 0;
    //             var Tot = 0;

    //             var TblHdStartCommon = '<thead><tr><th>Sl. </th><th>Product Description</th><th>HSN/SAC</th><th>UQM </th><th>Qty</th><th>Rate</th><th>Taxable value</th>';

    //             var TblHdCandS = '<th>SGST %</th><th>SGST Amt</th><th>CGST %</th><th>CGST Amt</th>';

    //             var TblHdIOnly = '<th>IGST %</th><th>IGST Amt</th>';

    //             var TblHdWithCess = '<th>CESS %</th><th>CESS Amt</th>';

    //             var TblHdEndCommon = '<th>Tax Total</th><th>Total</th></tr></thead>'

    //             for (var i = 0; i < rows.length; i++) {
    //                 var row = rows[i];
    //                 ItemListCommon += '<tr><td class="centerstyle">' + (i + 1) + '.</td><td>' + row.ProductName + '</td><td class="centerstyle">' + row.ProductCode + '</td><td class="centerstyle">' + row.MeasureUnitShort +
    //                     '</td><td class="amtstyle">' + FormatNumber(row.Qty) + '</td><td class="amtstyle">' + FormatNumber(row.PricePerUnit) + '</td><td class="amtstyle">' + FormatNumber(row.Gross) + '</td>' +
    //                     '<td class = "amtstyle"> ' + FormatNumber(row.SGSTRate) + ' </td><td class="amtstyle">' + FormatNumber(row.SGSTAmt) + '</td><td class = "amtstyle">' +
    //                     FormatNumber(row.CGSTRate) + ' </td><td class="amtstyle">' + FormatNumber(row.CGSTAmt) + '</td>' +
    //                     '<td class="amtstyle">' + FormatNumber(row.TaxTotal) + '</td><td class="amtstyle">' + FormatNumber(row.ItemTotal) + '</td></tr>';

    //                 ItemListCommonWithCess += '<tr><td class="centerstyle">' + (i + 1) + '.</td><td>' + row.ProductName + '</td><td class="centerstyle">' + row.ProductCode + '</td><td class="centerstyle">' + row.MeasureUnitShort +
    //                     '</td><td class="amtstyle">' + FormatNumber(row.Qty) + '</td><td class="amtstyle">' + FormatNumber(row.PricePerUnit) + '</td><td class="amtstyle">' + FormatNumber(row.Gross) + '</td>' +
    //                     '<td class = "amtstyle"> ' + FormatNumber(row.SGSTRate) + ' </td><td class="amtstyle">' + FormatNumber(row.SGSTAmt) + '</td > <td class = "amtstyle" > ' +
    //                     FormatNumber(row.CGSTRate) + ' </td><td class="amtstyle">' + FormatNumber(row.CGSTAmt) + '</td>' +
    //                     '<td class="amtstyle">' + FormatNumber(row.CessRate) + '</td><td class="amtstyle">' + FormatNumber(row.CessAmt) + '</td>' +
    //                     '<td class="amtstyle">' + FormatNumber(row.TaxTotal) + '</td><td class="amtstyle">' + FormatNumber(row.ItemTotal) + '</td></tr>';

    //                 ItemListWithI += '<tr><td class="centerstyle">' + (i + 1) + '.</td><td>' + row.ProductName + '</td><td class="centerstyle">' + row.ProductCode + '</td><td class="centerstyle">' + row.MeasureUnitShort +
    //                     '</td><td class="amtstyle">' + FormatNumber(row.Qty) + '</td><td class="amtstyle">' + FormatNumber(row.PricePerUnit) + '</td><td class="amtstyle">' + FormatNumber(row.Gross) + '</td>' +
    //                     '<td class="amtstyle">' + FormatNumber(row.IGSTRate) + '</td><td class="amtstyle">' + FormatNumber(row.IGSTAmt) + '</td>' +
    //                     '<td class="amtstyle">' + FormatNumber(row.TaxTotal) + '</td><td class="amtstyle">' + FormatNumber(row.ItemTotal) + '</td></tr>';

    //                 ItemListWithIWithCess += '<tr><td class="centerstyle">' + (i + 1) + '.</td><td>' + row.ProductName + '</td><td class="centerstyle">' + row.ProductCode + '</td><td class="centerstyle">' + row.MeasureUnitShort +
    //                     '</td><td class="amtstyle">' + FormatNumber(row.Qty) + '</td><td class="amtstyle">' + FormatNumber(row.PricePerUnit) + '</td><td class="amtstyle">' + FormatNumber(row.Gross) + '</td>' +
    //                     '<td class="amtstyle">' + FormatNumber(row.IGSTRate) + '</td><td class="amtstyle">' + FormatNumber(row.IGSTAmt) + '</td>' +
    //                     '<td class="amtstyle">' + FormatNumber(row.CessRate) + '</td><td class="amtstyle">' + FormatNumber(row.CessAmt) + '</td>' +
    //                     '<td class="amtstyle">' + FormatNumber(row.TaxTotal) + '</td><td class="amtstyle">' + FormatNumber(row.ItemTotal) + '</td></tr>';

    //                 // ItemListIonly += '<td class="amtstyle">' + FormatNumber(row.IGSTRate) + '</td><td class="amtstyle">' + FormatNumber(row.IGSTAmt) + '</td>';

    //                 // ItemListWithCess += '<td class="amtstyle">' + FormatNumber(row.CessRate) + '</td><td class="amtstyle">' + FormatNumber(row.CessAmt) + '</td>'

    //                 TotGross += parseFloat(row.Gross);
    //                 TotSgst += parseFloat(row.SGSTAmt);
    //                 TotCgst += parseFloat(row.CGSTAmt);
    //                 TotIgst += parseFloat(row.IGSTAmt);
    //                 TotCess += parseFloat(row.CessAmt);
    //                 TotTax += parseFloat(row.TaxTotal);
    //                 Tot += parseFloat(row.ItemTotal);
    //             }
    //             var TotalCommonWithCess = '<tr><td colspan="6" class="centerstyle grey">Total</td><td class="amtstyle">' + FormatNumber(TotGross) + '</td><td></td><td class="amtstyle">' + FormatNumber(TotSgst) +
    //                 '</td><td></td><td class="amtstyle">' + FormatNumber(TotCgst) + '</td><td></td><td class="amtstyle">' + FormatNumber(TotCess) +
    //                 '</td><td class="amtstyle">' + FormatNumber(TotTax) + '</td><td class="amtstyle">' + FormatNumber(Tot) + '</td></tr>';

    //             var TotalCommon = '<tr><td colspan="6" class="centerstyle grey">Total</td><td class="amtstyle">' + FormatNumber(TotGross) + '</td><td></td><td class="amtstyle">' + FormatNumber(TotSgst) +
    //                 '</td><td></td><td class="amtstyle">' + FormatNumber(TotCgst) + '</td>' + '</td><td class="amtstyle">' + FormatNumber(TotTax) + '</td> <td class = "amtstyle" > ' + FormatNumber(Tot) + ' </td></tr> ';

    //             var TotalIWithCess = '<tr><td colspan="6" class="centerstyle grey">Total</td><td class="amtstyle">' + FormatNumber(TotGross) + '</td><td></td><td class="amtstyle">' + FormatNumber(TotIgst) +
    //                 '</td><td></td><td class="amtstyle">' + FormatNumber(TotCess) + '</td><td class="amtstyle">' + FormatNumber(TotTax) + '</td><td class="amtstyle">' + FormatNumber(Tot) + '</td></tr>';

    //             var TotalI = '<tr><td colspan="6" class="centerstyle grey">Total</td><td class="amtstyle">' + FormatNumber(TotGross) + '</td><td></td><td class="amtstyle">' + FormatNumber(TotIgst) +
    //                 '</td><td class="amtstyle">' + FormatNumber(TotTax) + '</td><td class="amtstyle">' + FormatNumber(Tot) + '</td></tr>';

    //             if (TotSgst > 0) {
    //                 if (TotCess > 0) {
    //                     ItemTbl = TblHdStartCommon + TblHdCandS + TblHdWithCess + TblHdEndCommon + ItemListCommonWithCess + TotalCommonWithCess;
    //                     $('#ItemListTbl').html(ItemTbl);
    //                 } else {
    //                     ItemTbl = TblHdStartCommon + TblHdCandS + TblHdEndCommon + ItemListCommon + TotalCommon;
    //                     $('#ItemListTbl').html(ItemTbl);
    //                 }
    //             } else {
    //                 if (TotCess > 0) {
    //                     ItemTbl = TblHdStartCommon + TblHdIOnly + TblHdWithCess + TblHdEndCommon + ItemListWithIWithCess + TotalIWithCess;
    //                     $('#ItemListTbl').html(ItemTbl);
    //                 } else {
    //                     ItemTbl = TblHdStartCommon + TblHdIOnly + TblHdEndCommon + ItemListWithI + TotalI;
    //                     $('#ItemListTbl').html(ItemTbl);
    //                 }
    //             }
    //         })

    //     })

    // });

    // GetSelfDetails(function (rows) {
    //     var row = rows[0];
    //     $("#SelfName").html(row.SelfName);
    //     $("#OwnPan").html(row.SelfPAN);
    //     // var list = '';
    //     // ListOfAddresses(function (rows) {
    //     //     for (var i = 0; i < rows.length; i++) {
    //     //         var row = rows[i];
    //     //         list += '<option value="' + row.SelfAdrId + '">' + i + '. ' + row.AddressType + '</option>';
    //     //     }
    //     //     $('#BillFroAdrIdList').html(list);
    //     //     $("#BillFroAdrIdList").prop('selectedIndex', 0).trigger("change");
    //     // })

    // });

    // GetSalesSummary(InvId, function (rows) {
    //     var row = rows[0];
    //     BillFroId = row.BillFroId;
    //     GetSelectedAddressDetails(BillFroId, function (rows) {
    //         var AdrRow = rows[0];
    //         $('#BillFromAdrLbl').text(AdrRow.Address + ", " + AdrRow.State);
    //         $('#BillFromGSTINLbl').text(AdrRow.GSTIN);
    //         // $('#BillFromCustStateCodeLbl').text("State Code: " + row.StateCode);
    //         // BillFroStateCode = parseInt(row.StateCode);
    //         // BillFroId = parseInt(row.SelfAdrId);
    //         // BranchCode = row.BranchCode;
    //     });
    //     // $("#SelectCustomer").val(row.VendorID).trigger("change");
    //     // $("#BillFroAdrIdList").val(row.BillFroId).trigger("change");
    //     // $('#InvDate').val(moment(row.InvDate).format('DD/MM/YYYY'));
    //     // $('#InvDate').prop("disabled", true);
    //     // $('#InvoiceNo').val(row.InvoiceNo);
    //     // SalesId = row.SalesId;
    //     // setTimeout(function () {
    //     //     $("#BillToAdrIdList").val(row.BillToId).trigger("change");
    //     //     $("#ShipToAdrIdList").val(row.ShipToId).trigger("change");
    //     // }, 100);
    // })

});