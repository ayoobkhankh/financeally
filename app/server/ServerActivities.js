// var con = require("../server/connection");
// var excel = require('excel4node');

const models = require('../../models');
const db = require('../../models/index');
const Sequelize = require('sequelize');


// Tax Activities Starts Here

async function AddOrUpdateTax(id, TaxName, TaxDesc, SGSTRate, CGSTRate, IGSTRate, CESSRate) {
    var data;
    await models.taxes.upsert({
        id: id,
        TaxName: TaxName,
        TaxDesc: TaxDesc,
        SGSTRate: SGSTRate,
        CGSTRate: CGSTRate,
        IGSTRate: IGSTRate,
        CESSRate: CESSRate
    }).then(result => {
        if (result === false) {
            data = "Tax catagory updated!";
        }
        else if (result === true) {
            data = "Tax catagory saved!";
        }
        else data = "An error occured!";
    }).catch(err => {
        data = "An error occured";
    });
    return data;
};


async function ListOfTaxes() {
    var data;
    await models.taxes.findAll({ attributes: ['id', 'TaxName'] }).then(function (list) {
        data = list;
    })
    return data;
}

async function GetTaxDetails(id) {
    var data;
    await models.taxes.findAll({
        where: {
            id: id
        }
    }
    ).then(function (list) {
        data = list;
    })
    return data;
}

// //End of Tax Activities

// //Product Activities Starts Here
async function AddOrUpdateProduct(id, ProductName, ProductDesc, ProductType, ProductCodeType, ProductCode, TaxClassId, MeasureUnit, MeasureUnitShort, SalePrice) {
    var data;
    await models.products.upsert({
        id: id,
        ProductName: ProductName,
        ProductDesc: ProductDesc,
        ProductType: ProductType,
        ProductCodeType: ProductCodeType,
        ProductCode: ProductCode,
        TaxClassId: TaxClassId,
        MeasureUnit: MeasureUnit,
        MeasureUnitShort: MeasureUnitShort,
        SalePrice: SalePrice
    }).then(result => {
        if (result === false) {
            data = "Product details updated!";
        }
        else if (result === true) {
            data = "Product details saved!";
        }
        else data = "An error occured!";
    }).catch(err => {
        data = "An error occured";
    });
    return data;
};

async function ListOfProducts() {
    var data;
    await models.products.findAll({ attributes: ['id', 'ProductName'] }).then(function (list) {
        data = list;
    })
    return data;
}

async function GetProductDetails(id) {
    var data;
    await models.products.findAll({
        where: {
            id: id
        }
    }
    ).then(function (list) {
        data = list;
    })
    return data;
}

// //End of Product Activities

// //Party Activities Starts Here

async function AddOrUpdateParty(id, PartyName, PartyPAN) {
    var data;
    await models.parties.upsert({
        id: id,
        PartyName: PartyName,
        PartyPAN: PartyPAN,
    }).then(result => {
        if (result === false) {
            data = "Party details updated!";
        }
        else if (result === true) {
            data = "Party details saved!";
        }
        else data = "An error occured!";
    }).catch(err => {
        data = "An error occured";
    });
    return data;
};

async function ListOfParty() {
    var data;
    await models.parties.findAll({ attributes: ['id', 'PartyName'] }).then(function (list) {
        data = list;
    })
    return data;
}

async function GetPartyDetails(id) {
    var data;
    await models.parties.findAll({
        where: {
            id: id
        }
    }
    ).then(function (list) {
        data = list;
    })
    return data;
}

async function AddOrUpdateBranch(id, PartyId, PartyAdrType, PartyGSTIN, PartyAdr, PartyState, PartyStateCode, PartyPin, PartyPOC, PartyPhone, PartyEmail) {
    var data;
    await models.partybranches.upsert({
        id: id,
        PartyId: PartyId,
        PartyAdrType: PartyAdrType,
        PartyGSTIN: PartyGSTIN,
        PartyAdr: PartyAdr,
        PartyState: PartyState,
        PartyStateCode: PartyStateCode,
        PartyPin: PartyPin,
        PartyPOC: PartyPOC,
        PartyPhone: PartyPhone,
        PartyEmail: PartyEmail
    }).then(result => {
        if (result === false) {
            data = "Branch details updated!";
        }
        else if (result === true) {
            data = "Branch details saved!";
        }
        else data = "An error occured!";
    }).catch(err => {
        data = "An error occured";
    });
    return data;

};

async function ListOfBranchesWithSelId(id) {
    var data;
    await models.partybranches.findAll({
        where: {
            PartyId: id
        }
    }).then(function (list) {
        data = list;
    })
    return data;
}

async function GetBranchDetails(id) {
    var data;
    await models.partybranches.findAll({
        where: {
            id: id
        }
    }
    ).then(function (list) {
        data = list;
    })
    return data;
}

// End of Party Activities

// Sales Activities Starts Here
async function GenerateInvoiceNo(InvoiceDate, BranchCode) {
    var AccMonth, AccYear, InvoiceNo, NextNo;
    var InvYear = parseInt(InvoiceDate.toString().substr(-4));
    var Invmonth = parseInt(InvoiceDate.toString().substr(3, 2));
    var Invdate = InvoiceDate.toString().substr(0, 2);
    if (Invmonth <= 3) {
        AccMonth = Invmonth + 9;
        AccYear = ((InvYear - 1).toString()) + "-" + (InvYear.toString().substr(2, 2));
        await ReturnNextInvno(BranchCode, AccMonth, InvYear).then(result => { NextNo = result + 1 });
        InvoiceNo = BranchCode + "/" + NextNo + "/" + AccMonth + "/" + AccYear;
        // InvoiceNo = AccMonth;

    } else {
        AccMonth = Invmonth - 3;
        AccYear = (InvYear.toString()) + "-" + ((InvYear + 1).toString().substr(2, 2));
        await ReturnNextInvno(BranchCode, AccMonth, InvYear).then(result => { NextNo = result + 1 });
        InvoiceNo = BranchCode + "/" + NextNo + "/" + AccMonth + "/" + AccYear;
        // InvoiceNo = AccMonth;
    }
    let result = { AccMonth: AccMonth, InvYear: InvYear, AccYear: AccYear, InvoiceNo: InvoiceNo };

    return result;
}

async function ReturnNextInvno(BranchCode, Month, Year) {
    var data;
    await models.sales.count({
        where: [{
            InvYear:
            {
                $eq: Year
            },
            BranchCode:
            {
                $eq: BranchCode
            },
            InvMonth:
            {
                $eq: Month
            }
        }]
    }
    ).then(function (list) {
        data = list;
    })
    return data;
}

async function NewSalesSummary(obj) {
    await models.sales.create(obj).then(result => {
        data = "Sale Create"
    }).catch(err => {
        data = "An error occured";
    });
    return data;
};

async function UpdateSalesSummary(id, obj) {
    await models.sales.update(obj, { where: { id: id } }).then(result => {
        data = "Sale Updated"
    }).catch(err => {
        data = "An error occured";
    });
    return data;
};

async function DeleteSalesDetails(InvoiceNo) {
    await models.salesdetails.destroy({ where: { InvoiceNo: InvoiceNo } }).then(result => {
        data = "Sale details deleted"
    }).catch(err => {
        data = "An error occured";
    });
    return data;
};

async function SaveSalesDetails(data) {
    await models.salesdetails.bulkCreate(data).then(result => {
        data = "Sales details Created"
    }).catch(err => {
        data = "An error occured";
    });
    return data;
}

async function SaveSale(data) {
    let InvId = data.summary.id;
    if (InvId === 0) {
        let RawDate = data.summary.Rawdate;
        let BranchCode = data.summary.BranchCode;
        var RawDetails = data.details;
        await GenerateInvoiceNo(RawDate, BranchCode).then(result => {
            data.summary.InvYear = parseInt(result.InvYear);
            data.summary.InvMonth = parseInt(result.AccMonth);
            data.summary.InvoiceNo = (result.InvoiceNo).toString();
        });
        var details = RawDetails.map(function (el) {
            var o = Object.assign({}, el);
            o.InvoiceNo = data.summary.InvoiceNo;
            return o;
        })
        // console.log(details);
        let summary = data.summary;
        await NewSalesSummary(summary).then(result => console.log(result));
        await SaveSalesDetails(details).then(result => console.log(result));

    } else {
        await UpdateSalesSummary(InvId, data.summary).then(result => console.log(result));
        await DeleteSalesDetails(data.summary.InvoiceNo).then(result => console.log(result));
        var RawDetails = data.details;
        var details = RawDetails.map(function (el) {
            var o = Object.assign({}, el);
            o.InvoiceNo = data.summary.InvoiceNo;
            return o;
        })
        // console.log(details);
        await SaveSalesDetails(details).then(result => console.log(result));
    }
}

async function SearchSales(StartDate, EndDate, SearchField, SearchCriteria) {

    var query = "SELECT sales.id, sales.InvoiceNo, DATE_FORMAT(sales.InvDate, '%d/%m/%Y') AS InvDate, " +
        " sales.VendorName, SUM(salesdetails.Gross) AS 'GrossTotal', SUM(salesdetails.TaxTotal) AS 'TaxTotal', " +
        "SUM(salesdetails.ItemTotal) AS 'Total' FROM sales INNER JOIN salesdetails on sales.InvoiceNo = salesdetails.InvoiceNo " +
        "where sales.InvDate >= '" + StartDate + "' and sales.InvDate <= '" + EndDate + "' group by sales.id";

    await db.sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).then(result => {
        data = result;
    }).catch(err => {
        data = "An error occured";
    });

    return data;
}

async function GetSalesData(id) {
    var InvoiceNo;
    var summary = {};
    var details = [];
    await GetSalesSummary(id).then(rows => {
        var row = rows[0];
        InvoiceNo = row.InvoiceNo;
        summary.id = row.id;
        summary.InvYear = row.InvYear;
        summary.InvMonth = row.InvMonth;
        summary.VendorID = row.VendorID;
        summary.BillFroId = row.BillFroId;
        summary.BranchCode = row.BranchCode;
        summary.BillToId = row.BillToId;
        summary.InvoiceNo = row.InvoiceNo;
        summary.PONo = row.PONo;
        summary.InvDate = row.InvDate;
        summary.BillFroStateCode = row.BillFroStateCode;
        summary.BillToStateCode = row.BillToStateCode;
        summary.VendorName = row.VendorName;
        summary.SaleType = row.SaleType;
        summary.RCM = row.RCM;
        summary.SelectedBankId = row.SelectedBankId;
    });
    await GetSalesDetails(InvoiceNo).then(rows => {
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var obj = {
                id: rows[i].id,
                ProductId: rows[i].ProductId,
                ProductName: rows[i].ProductName,
                ProductCode: rows[i].ProductCode,
                ProductType: rows[i].ProductType,
                PricePerUnit: rows[i].PricePerUnit,
                Qty: rows[i].Qty,
                MeasureUnit: rows[i].MeasureUnit,
                MeasureUnitShort: rows[i].MeasureUnitShort,
                Gross: rows[i].Gross,
                TaxClassId: rows[i].TaxClassId,
                SGSTRate: rows[i].SGSTRate,
                SGSTAmt: rows[i].SGSTAmt,
                CGSTRate: rows[i].CGSTRate,
                CGSTAmt: rows[i].CGSTAmt,
                IGSTRate: rows[i].IGSTRate,
                IGSTAmt: rows[i].IGSTAmt,
                CESSRate: rows[i].CESSRate,
                CESSAmt: rows[i].CESSAmt,
                TaxTotal: rows[i].TaxTotal,
                ItemTotal: rows[i].ItemTotal
            }
            details.push(obj);
        }
    });
    var data = { summary, details };
    return data;
}

async function GetSalesSummary(id) {
    var data;
    await models.sales.findAll({
        where: {
            id: id
        }
    }).then(function (list) {
        data = list;
    })
    return data;
}

async function GetSalesDetails(InvoiceNo) {
    var data;
    await models.salesdetails.findAll({
        where: {
            InvoiceNo: InvoiceNo
        }
    }).then(function (list) {
        data = list;
    })
    return data;
}

// SearchSales("01/04/2018", "14/12/2018", 0, 0).then(result => console.log(JSON.stringify(result)));
// let summary = {
//     id: 9,
//     VendorID: 1,
//     BillFroId: 1,
//     BranchCode: "TS",
//     BillToId: 2,
//     PONo: "PO1",
//     InvDate: "2018-04-05",
//     InvoiceNo: "TS/3/3/2018-19",
//     Rawdate: "05/06/2018",
//     BillFroStateCode: 8,
//     BillToStateCode: 7,
//     VendorName: "Sasi",
//     SaleType: "Credit",
//     RCM: "NO",
//     SelectedBankId: 1
// };

// var details = [];
// var line1 = {
//     id: 0,
//     ProductId: 1,
//     ProductCode: "1254864",
//     ProductName: "Maida",
//     ProductType: "Goods",
//     PricePerUnit: 125,
//     Qty: 2,
//     MeasureUnit: "Kilograms",
//     MeasureUnitShort: "Kgs",
//     Gross: 250,
//     SGSTRate: 0,
//     SGSTAmt: 0,
//     CGSTRate: 0,
//     CGSTAmt: 0,
//     IGSTRate: 0,
//     IGSTAmt: 0,
//     CESSRate: 0,
//     CESSAmt: 0,
//     TaxTotal: 0,
//     ItemTotal: 250
// }

// var line2 = {
//     id: 0,
//     ProductId: 1,
//     ProductCode: "1254864",
//     ProductName: "Maida",
//     ProductType: "Goods",
//     PricePerUnit: 125,
//     Qty: 2,
//     MeasureUnit: "Kilograms",
//     MeasureUnitShort: "Kgs",
//     Gross: 250,
//     SGSTRate: 0,
//     SGSTAmt: 0,
//     CGSTRate: 0,
//     CGSTAmt: 0,
//     IGSTRate: 0,
//     IGSTAmt: 0,
//     CESSRate: 0,
//     CESSAmt: 0,
//     TaxTotal: 0,
//     ItemTotal: 250
// }

// var line3 = {
//     id: 0,
//     // ProductId: 1,
//     // ProductCode: "1254864",
//     // ProductName: "Maida",
//     // ProductType: "Goods",
//     // PricePerUnit: 125,
//     // Qty: 2,
//     // MeasureUnit: "Kilograms",
//     // MeasureUnitShort: "Kgs",
//     // Gross: 250,
//     // SGSTRate: 0,
//     // SGSTAmt: 0,
//     // CGSTRate: 0,
//     // CGSTAmt: 0,
//     // IGSTRate: 0,
//     // IGSTAmt: 0,
//     // CESSRate: 0,
//     // CESSAmt: 0,
//     // TaxTotal: 0,
//     // ItemTotal: 250
// }

// details.push(line1);
// details.push(line2);
// details.push(line3);
// var details = { arr };
// var list = { summary, details }

// var RawDetails = list.details;
// var result = RawDetails.map(function (el) {
//     var o = Object.assign({}, el);
//     o.InvoiceNo = "Buhahaha";
//     return o;
// })

// Master Activities Starts Here
async function AddOrUpdateMaster(id, SelfName, SelfTagLine, Regno, LogoPath, SelfPAN) {
    var data;
    await models.selfdetails.upsert({
        id: id,
        SelfName: SelfName,
        SelfTagLine: SelfTagLine,
        Regno: Regno,
        LogoPath: LogoPath,
        SelfPAN: SelfPAN,
    }).then(result => {
        if (result === false) {
            data = "Master details updated!";
        }
        else if (result === true) {
            data = "Master details saved!";
        }
        else data = "An error occured!";
    }).catch(err => {
        data = "An error occured";
    });
    return data;
};

async function GetSelfDetails(id) {
    var data;
    await models.selfdetails.findAll({
        where: {
            id: id
        }
    }
    ).then(function (list) {
        data = list;
    })
    return data;
}

async function AddOrUpdateSelfAdr(id, AddressType, Address, State, StateCode, PIN, GSTIN, BranchCode, Phone, POC, Email) {
    var data;
    await models.selfadresses.upsert({
        id: id,
        AddressType: AddressType,
        Address: Address,
        State: State,
        StateCode: StateCode,
        PIN: PIN,
        GSTIN: GSTIN,
        BranchCode: BranchCode,
        Phone: Phone,
        POC: POC,
        Email: Email,
    }).then(result => {
        if (result === false) {
            data = "Master branch updated!";
        }
        else if (result === true) {
            data = "Master branch saved!";
        }
        else data = "An error occured!";
    }).catch(err => {
        data = "An error occured";
    });
    return data;
};

async function ListOfAddresses() {
    var data;
    await models.selfadresses.findAll({ attributes: ['id', 'AddressType'] }).then(function (list) {
        data = list;
    })
    return data;
}

async function GetSelectedAddressDetails(id) {
    var data;
    await models.selfadresses.findAll({
        where: {
            id: id
        }
    }
    ).then(function (list) {
        data = list;
    })
    return data;
}

// End of Master Activitiess

// Report Activities Goes Here
// function TestExcel() {
// var workbook = new excel.Workbook();
// var worksheet = workbook.addWorksheet('Sheet 1');
// var worksheet2 = workbook.addWorksheet('Sheet 2');

// // Create a reusable style
// var style = workbook.createStyle({
// font: {
// color: '#FF0800',
// size: 12
// },
// numberFormat: '$ #,##0.00; ($ #,##0.00); -'
// });

// // Set value of cell A1 to 100 as a number type styled with paramaters of
// style
// worksheet.cell(1, 1).number(100).style(style);

// // Set value of cell B1 to 300 as a number type styled with paramaters of
// style
// worksheet.cell(1, 2).number(200).style(style);

// // Set value of cell C1 to a formula styled with paramaters of style
// worksheet.cell(1, 3).formula('A1 + B1').style(style);

// // Set value of cell A2 to 'string' styled with paramaters of style
// worksheet.cell(2, 1).string('string').style(style);

// // Set value of cell A3 to true as a boolean type styled with paramaters of
// style but with an adjustment to the font size.
// worksheet.cell(3, 1).bool(true).style(style).style({
// font: {
// size: 14
// }
// });

// workbook.write('Excel.xlsx');
// }

function FormatNumber(num) {
    var ConNum = num.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
        // style: 'currency',
        // currency: 'INR',
    });
    return (ConNum);
}

// console.log(FormatNumber(1500));
// TestExcel();
// End of report activities

// Dashboard activities goes here

// End of Dashboard activities

// User Activities goes here
// function ListOfUsers(callback) {
// con.query("SELECT UserId, Name FROM users ORDER BY UserId", function (err,
// rows) {
// if (err) {
// console.log(err);
// }
// callback(rows);
// });
// }

// function GetUserDetails(UserId, callback) {
// con.query("SELECT * FROM users WHERE UserId = ?", [UserId], function (err,
// rows) {
// if (err) {
// console.log(err);
// }
// callback(rows);
// });
// }

// End of User Activities

// PingServer(function (rows) {
// console.log(rows);
// })

