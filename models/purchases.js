'use strict';
module.exports = (sequelize, DataTypes) => {
    var purchases = sequelize.define('purchases', {
        InvYear: DataTypes.INTEGER,
        InvMonth: DataTypes.INTEGER,
        VendorID: DataTypes.INTEGER,
        BillFroId: DataTypes.INTEGER,
        BranchCode: DataTypes.STRING,
        BillToId: DataTypes.INTEGER,
        InvoiceNo: DataTypes.STRING,
        PONo: DataTypes.STRING,
        InvDate: DataTypes.DATE,
        BillFroStateCode: DataTypes.INTEGER,
        BillToStateCode: DataTypes.INTEGER,
        VendorName: DataTypes.STRING,
        SaleType: DataTypes.STRING,
        RCM: DataTypes.STRING
    }, {});
    purchases.associate = function (models) {
        // associations can be defined here
    };
    return purchases;
}; 