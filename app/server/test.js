// var loki = require("lokijs");

// db = new loki('test.json');

// var connections = db.addCollection("connections");

// connections.insert({ name: "Local Connection", servername: "localhost", port: 3306, username: "root", password: "root", dbname: "test"}); 

// // console.log(connections.find({'name':'Local Connection'}).mapReduce('servername'));

// db.saveDatabase();

// pm 
// var obj = {
//     connections:[]
// };
// // var datafile = path.join(__dirname, '../../config/CurConnection.json');
// var data = fs.readFileSync(datafile)
// obj = JSON.parse(data);
// var output = {
//     'selservername': "Some Server",
//     'selport': 1234,
//     'seldbname': "Database",
//     'selusername': "User1",
//     'selpassword': "User123"
// };

// obj.connections.push(output);
// var content = JSON.stringify(obj);

// fs.writeFile(datafile, content, 'utf8', function (err) {
//     if (err) {
//         return console.log(err);
//     }
// });
// obj = JSON.parse(data);
// obj[0].push(output);
// console.log(data);


// var puppeteer = require('puppeteer');
// var async = require("async");

// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false
//     });
//     const page = await browser.newPage();
//     await page.goto('https://services.gst.gov.in/services/login', {
//         waitUntil: 'networkidle2'
//     });

//     // await page.waitFor('input[name=user_name]');
//     // await page.waitFor('input[name=user_pass]');

//     // page.click("#user_name");

//     await page.type('#username', 'optosystem-123')
//     await page.type('#user_pass', 'Opto123$')
//     // await page.$eval(['#user_name]', el => el.value = 'test@example.com'], ['#user_pass]', el => el.value = 'test@example.com']);

//     // await page.waitFor('input[name=user_pass]');
//     // await page.$eval('input[name=user_pass]', el => el.value = 'test@example.com');
//     // await page.screenshot({
//     //     path: 'example.png'
//     // });

//     // await browser.close();
// })();

// var models = require('../../models');

// async function FindAllTaxes() {
//     var data;
//     await models.taxes.findAll().then(function (result) {
//         data = JSON.stringify(result);
//     })
//     return data;
// };

// FindAllTaxes();

// async function AddOrUpdateTax(id, TaxName, TaxDesc, SGSTRate, CGSTRate, IGSTRate, CESSRate) {
//     const result = await models.taxes.upsert({
//         id: id,
//         TaxName: TaxName,
//         TaxDesc: TaxDesc,
//         SGSTRate: SGSTRate,
//         CGSTRate: CGSTRate,
//         IGSTRate: IGSTRate,
//         CESSRate: CESSRate
//     });

//     if (result) {
//         return "Success";
//     }
//     else {
//         return "Error";
//     }
// };

// var data = [2, "GST 28%", "GST 18%", 9, 9, 18, 0];

// AddOrUpdateTax(...data).then(result => console.log(result));


// async function GenerateInvoiceNo(arr) {

// }
const models = require('../../models');

async function GenerateInvoiceNo(InvoiceDate) {
    let AccMonth, AccYear, InvoiceNo;
    let InvYear = parseInt(InvoiceDate.toString().substr(-4));
    let Invmonth = parseInt(InvoiceDate.toString().substr(3, 2));
    let Invdate = InvoiceDate.toString().substr(0, 2);
    if (Invmonth <= 3) {
        AccMonth = Invmonth + 9;
        AccYear = ((InvYear - 1).toString()) + "-" + (InvYear.toString().substr(2, 2));
        InvoiceNo = AccMonth + "/" + AccYear;
    } else {
        AccMonth = Invmonth - 3;
        AccYear = (InvYear.toString()) + "-" + ((InvYear + 1).toString().substr(2, 2));
        InvoiceNo = "0" + AccMonth + "/" + AccYear;
    }
    let result = { AccMonth: AccMonth, InvYear: InvYear, AccYear: AccYear, InvoiceNo: InvoiceNo };
    return result;
}

GenerateInvoiceNo('01/04/2018').then(result => console.log(result));

async function ReturnNextInvno(StateCode, Month, Year) {
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

async function NewSalesSummary(obj) {
    await models.sales.create(obj).then(result => {
        data = "Sale Create"
    }).catch(err => {
        data = "An error occured";
    });
    return data;
};

async function NewSalesSummary(obj) {
    await models.sales.create(obj).then(result => {
        data = "Sale Created"
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

async function DeleteSalesDetails(id) {
    await models.salesdetails.destroy({ where: { SalesId: id } }).then(result => {
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

let summary = {
    id: 0,
    VendorID: 1,
    BillFroId: 1,
    BranchCode: "TS",
    BillToId: 2,
    PONo: "PO1",
    InvDate: "2018-04-05",
    Rawdate: "05/06/2018",
    BillFroStateCode: 8,
    BillToStateCode: 7,
    VendorName: "Sasi",
    SaleType: "Credit",
    RCM: "NO",
    SelectedBankId: 1
};


// SaveSalesSummary(data).then(result => console.log(result));
// let misc = { rawdate: "15/07/2018" };
let list = { summary };

// console.log(list);

async function SaveSale(data) {
    let InvId = data.summary.id;

    if (InvId === 0) {
        let RawDate = data.summary.Rawdate;
        await GenerateInvoiceNo(RawDate).then(result => {
            data.summary.InvYear = parseInt(result.InvYear);
            data.summary.InvMonth = parseInt(result.AccMonth);
            data.summary.InvoiceNo = (result.InvoiceNo).toString();
        });
        let summary = data.summary;
        await NewSalesSummary(summary).then(result => console.log(result));
        // console.log(summary);
    } else {
        await UpdateSalesSummary(InvId, summary).then(result => console.log(result));
        await DeleteSalesDetails(InvId).then(result => console.log(result));
    }
}

// SaveSale(list);

//
// let data = { id: 0,
//     VendorID: 1,
//     BillFroId: 1,
//     BranchCode: 'KL',
//     BillToId: 2,
//     PONo: 'PO1',
//     InvDate: '2018-04-05',
//     BillFroStateCode: 8,
//     BillToStateCode: 7,
//     VendorName: 'Someone',
//     SaleType: 'CASH',
//     RCM: 'NO',
//     SelectedBankId: 1,
//     InvYear: 2018,
//     InvMonth: 4,
//     InvoiceNo: '04/2018-19' };
//
// NewSalesSummary(data).then(result => console.log("Inserted"));

// GenerateInvoiceNo("15/07/2019").then(result => console.log(result.Invyear));
// var students = { name: "Ayoobkhan" }
// var arr = { students };

// async function arrtest(array) {
//     console.log(array.students.name);
// }

// arrtest(arr);