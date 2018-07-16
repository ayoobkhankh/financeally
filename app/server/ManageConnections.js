const ipc = require('electron').ipcRenderer


$(document).ready(function () {

    // $("#SelectCon").select2({
    //     placeholder: "Select Connection",
    //     allowClear: true
    // });

    //hide scroll bars
    $("body").css("overflow", "hidden");

    // $('#SelectCon').prop("disabled", true);
    // $('#RefreshConList').prop("disabled", true);

    var Sequelize = require('sequelize');
    var db = require('../../models/index');
    var fs = require("fs");
    var path = require("path");
    // var ConId = 0;
    // var mysql = require('mysql');

    // function GetConList() {
    //     $('#SelectCon').html("");
    //     var conlist = '<option></option>';
    var datafile = path.join(__dirname, '../../config/config.json');

    var data = fs.readFileSync(datafile)
    obj = JSON.parse(data);

    $('#ServerName').val(obj.production.host);
    $('#Port').val(obj.production.port);
    $('#DatabaseName').val(obj.production.database);
    $('#UserName').val(obj.production.username);
    $('#Password').val(obj.production.password);

    console.log(obj);
    // console.log(obj);
    // var conlistob = obj.connections;
    // for (var i = 0; i < conlistob.length; i++) {
    //     var row = conlistob[i];
    //     conlist += '<option value=' + row.id + '>' + row.conname + '</option>';
    // }
    // $('#SelectCon').html(conlist);

    // };

    // GetConList();

    // $("#RefreshConList").click(function () {
    //     GetConList();
    // });

    // $('#SelectCon').on('change', function (e) {
    //     var SelectedCon = parseInt(this.value);
    //     var datafile = path.join(__dirname, '../../config/config.json');

    //     var data = fs.readFileSync(datafile)
    //     obj = JSON.parse(data);
    //     var condetailsobj = obj.connections;
    //     for (var i = 0; i < condetailsobj.length; i++) {
    //         if (condetailsobj[i].id === SelectedCon) {
    //             var row = condetailsobj[i];
    //             ConId = parseInt(row.id);
    //             // alert(ConId);
    //             $('#ConName').val(row.conname);
    //             $('#ServerName').val(row.servername);
    //             $('#Port').val(row.portno);
    //             $('#DatabaseName').val(row.dbname);
    //             $('#UserName').val(row.username);
    //             $('#Password').val(row.password);
    //             return;
    //         }
    //     }
    // });

    // $(":checkbox").change(function () {
    //     if ($(this).is(':checked')) {
    //         $('#SelectCon').prop("disabled", true);
    //         $('#RefreshConList').prop("disabled", true);
    //         ConId = 0;
    //         ClearAll();
    //     } else {
    //         $('#SelectCon').prop("disabled", false);
    //         $('#RefreshConList').prop("disabled", false);
    //     }
    // });

    // function ClearAll() {
    //     $('#ConName').val("");
    //     $("#ServerName").val("");
    //     $("#Port").val("");
    //     $("#DatabaseName").val("");
    //     $("#UserName").val("");
    //     $("#Password").val("");
    // };


    // var conname = $('#ConName').val();
    // var servername = $('#ServerName').val();
    // var port = parseInt($('#Port').val());
    // var username = $('#UserName').val();
    // var password = $('#Password').val();
    // var dbname = $('#DatabaseName').val();

    // var connection = mysql.createConnection({
    //     multipleStatements: true,
    //     host: servername,
    //     port: port,
    //     user: username,
    //     password: password,
    //     database: dbname
    // });

    // var CreateMetaTblQuery = 'CREATE TABLE IF NOT EXISTS `metadata` (Id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'Settings VARCHAR(100) DEFAULT NULL, Setvalue INT(10) DEFAULT NULL) ENGINE=InnoDB';

    // var CreateUserTblQuery = 'CREATE TABLE IF NOT EXISTS `users` (UserId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'Name VARCHAR(100) DEFAULT NULL, Role VARCHAR(100) DEFAULT NULL, UserName VARCHAR(100) DEFAULT NULL, Password VARCHAR(100) DEFAULT NULL,' +
    //     'CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE = InnoDB';

    // var CreatePartyTblQuery = 'CREATE TABLE IF NOT EXISTS `party` (PartyId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'PartyName VARCHAR(100) DEFAULT NULL, PartyPAN VARCHAR(15) DEFAULT NULL, CreatedBy VARCHAR(100) DEFAULT NULL,' +
    //     'CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE = InnoDB';

    // var CreateBranchTblQuery = 'CREATE TABLE IF NOT EXISTS `branches` (PartyAdrId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'PartyId INT, PartyAdrType VARCHAR(15) DEFAULT NULL, PartyGSTIN VARCHAR(20) DEFAULT NULL, PartyAdr VARCHAR(100) DEFAULT NULL,' +
    //     'PartyState VARCHAR(100) DEFAULT NULL, PartyStateCode VARCHAR(100) DEFAULT NULL, PartyPin VARCHAR(50),' +
    //     'PartyPOC VARCHAR(100) DEFAULT NULL, PartyPhone VARCHAR(50) DEFAULT NULL, PartyEmail VARCHAR(100) DEFAULT NULL, CreatedBy VARCHAR(100) DEFAULT NULL,' +
    //     'CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE = InnoDB';

    // var CreateSelfTblQuery = 'CREATE TABLE IF NOT EXISTS `self` (Id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, SelfName VARCHAR(100)' +
    //     'DEFAULT NULL, SelfTagLine VARCHAR(300) DEFAULT NULL, Regno VARCHAR(300) DEFAULT NULL, LogoPath VARCHAR(300) DEFAULT NULL, SelfPAN VARCHAR(15) DEFAULT NULL) ENGINE=InnoDB';

    // var CreateSelfAddressesTblQuery = 'CREATE TABLE IF NOT EXISTS `selfadresses` (SelfAdrId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, AddressType VARCHAR(300) DEFAULT NULL, Address VARCHAR(300)' +
    //     'DEFAULT NULL, State VARCHAR(300) DEFAULT NULL, StateCode VARCHAR(300) DEFAULT NULL, PIN VARCHAR(300) DEFAULT NULL,  GSTIN VARCHAR(300) DEFAULT NULL, BranchCode VARCHAR(10) DEFAULT NULL, Phone VARCHAR(15) DEFAULT NULL, POC VARCHAR(100) DEFAULT NULL, SEmail VARCHAR(100) DEFAULT NULL) ENGINE=InnoDB';

    // var CreateTaxTblQuery = 'CREATE TABLE IF NOT EXISTS `taxes` (TaxId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'TaxName VARCHAR(100) DEFAULT NULL, TaxDesc VARCHAR(100) DEFAULT NULL, IGSTRate DECIMAL(5,2), CGSTRate DECIMAL(5,2),' +
    //     'SGSTRate DECIMAL(5,2), CESSRate DECIMAL(5,2), CreatedBy VARCHAR(100) DEFAULT NULL,' +
    //     'CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB';

    // var CreateProductsTblQuery = 'CREATE TABLE IF NOT EXISTS `products` (ProductId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'ProductName VARCHAR(100) DEFAULT NULL, ProductDesc VARCHAR(100) DEFAULT NULL, ProductType VARCHAR(100) DEFAULT NULL,' +
    //     'ProductCodeType VARCHAR(100) DEFAULT NULL, ProductCode VARCHAR(100) DEFAULT NULL, TaxClassId VARCHAR(100) DEFAULT NULL,' +
    //     'MeasureUnit VARCHAR(100) DEFAULT NULL, MeasureUnitShort VARCHAR(100) DEFAULT NULL, SalePrice DECIMAL(20,3),' +
    //     'CreatedBy VARCHAR(100) DEFAULT NULL, CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB';

    // var CreateSalesDetailedTblQuery = 'CREATE TABLE IF NOT EXISTS `salesdetailed` (LineId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'SalesId INT, ProductId INT(11), ProductCode VARCHAR(100) DEFAULT NULL, ProductName VARCHAR(100) DEFAULT NULL, ProductType VARCHAR(100) DEFAULT NULL,' +
    //     'PricePerUnit DECIMAL(20,3), Qty DECIMAL(20,3), MeasureUnit VARCHAR(100) DEFAULT NULL, MeasureUnitShort VARCHAR(100) DEFAULT NULL,' +
    //     'Gross DECIMAL(20,3), TaxClassId INT(11), SGSTRate DECIMAL(20,3), SGSTAmt DECIMAL(20,3),' +
    //     'CGSTRate DECIMAL(20,3), CGSTAmt DECIMAL(20,3), IGSTRate DECIMAL(20,3), IGSTAmt DECIMAL(20,3), CessRate DECIMAL(20,3),' +
    //     'CessAmt DECIMAL(20,3), TaxTotal DECIMAL(20,3), ItemTotal DECIMAL(20,3)) ENGINE=InnoDB';

    // var CreateSalesSummaryTblQuery = 'CREATE TABLE IF NOT EXISTS `salessummary` (SalesId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'InvYear INT, InvMonth INT, BillFroId INT, BranchCode VARCHAR(300) DEFAULT NULL, BillToId INT, VendorID INT, InvoiceNo VARCHAR(100) DEFAULT NULL,' +
    //     'PONo VARCHAR(100) DEFAULT NULL, InvDate DATE, BillFroStateCode VARCHAR(100) DEFAULT NULL, BillToStateCode VARCHAR(100) DEFAULT NULL,' +
    //     'VendorName VARCHAR(100) DEFAULT NULL, SaleType VARCHAR(100) DEFAULT NULL, RCM VARCHAR(100) DEFAULT NULL,' +
    //     'SelectedBankId VARCHAR(100) DEFAULT NULL, CreatedBy VARCHAR(100) DEFAULT NULL, CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB';

    // var CreatePurchaseSummaryTblQuery = 'CREATE TABLE IF NOT EXISTS `purchasesummary` (PurId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'InvYear INT, InvMonth INT, BillFroId INT, BillToId INT, BranchCode VARCHAR(300) DEFAULT NULL, VendorID INT, InvoiceNo VARCHAR(100) DEFAULT NULL,' +
    //     'PONo VARCHAR(100) DEFAULT NULL, InvDate DATE, BillFroStateCode VARCHAR(100) DEFAULT NULL, BillToStateCode VARCHAR(100) DEFAULT NULL,' +
    //     'VendorName VARCHAR(100) DEFAULT NULL, RCM VARCHAR(100) DEFAULT NULL,' +
    //     'CreatedBy VARCHAR(100) DEFAULT NULL, CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB';

    // var CreatePurchaseDetailedTblQuery = 'CREATE TABLE IF NOT EXISTS `purchasedetailed` (LineId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
    //     'PurId INT, ProductId INT(11), ProductCode VARCHAR(100) DEFAULT NULL, ProductName VARCHAR(100) DEFAULT NULL, ProductType VARCHAR(100) DEFAULT NULL,' +
    //     'PricePerUnit DECIMAL(20,3), Qty DECIMAL(20,3), MeasureUnit VARCHAR(100) DEFAULT NULL, MeasureUnitShort VARCHAR(100) DEFAULT NULL,' +
    //     'Gross DECIMAL(20,3), TaxClassId INT(11), SGSTRate DECIMAL(20,3), SGSTAmt DECIMAL(20,3),' +
    //     'CGSTRate DECIMAL(20,3), CGSTAmt DECIMAL(20,3), IGSTRate DECIMAL(20,3), IGSTAmt DECIMAL(20,3), CessRate DECIMAL(20,3),' +
    //     'CessAmt DECIMAL(20,3), TaxTotal DECIMAL(20,3), ItemTotal DECIMAL(20,3)) ENGINE=InnoDB';

    // connection.query(CreateMetaTblQuery + ';' + CreateUserTblQuery + ';' + CreatePartyTblQuery + ';' + CreateBranchTblQuery + ';' + CreateTaxTblQuery + ';' + CreateProductsTblQuery + ';' +
    //     CreateSelfTblQuery + ';' + CreateSelfAddressesTblQuery + ';' + CreateSalesSummaryTblQuery + ';' + CreateSalesDetailedTblQuery + ';' + CreatePurchaseSummaryTblQuery + ';' + CreatePurchaseDetailedTblQuery,
    //     function (err, rows, fields) {
    //         if (err) {
    //             console.log("An error ocurred performing the query.");
    //             console.log(err);
    //             return;
    //         } else {
    //             console.log(ConId);
    //             SaveConnection(ConId, conname, servername, port, username, password, dbname);
    //             alert("Connection details saved!")
    //             ClearAll();
    //         };
    //     })

    // connection.end(function () {
    //     // The connection has been closed
    // });
    $("#ServerConnect").click(function () {
        var servername = $('#ServerName').val();
        var portno = parseInt($('#Port').val());
        var username = $('#UserName').val();
        var password = $('#Password').val();
        var dbname = $('#DatabaseName').val();

        var credentials = {
            "production":
            {
                "username": username,
                "password": password,
                "database": dbname,
                "host": servername,
                "port": portno,
                "dialect": "mysql",
                "pool": {
                    "max": 5,
                    "min": 0,
                    "idle": 10000
                }
            }
        }
        var jsondata = JSON.stringify(credentials);

        fs.writeFile(datafile, jsondata, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });

    $("#InitDB").click(function () {
        db.sequelize.sync();
    });

});