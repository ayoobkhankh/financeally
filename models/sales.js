'use strict';
module.exports = (sequelize, DataTypes) => {
    var sales = sequelize.define('sales', {
        InvYear: DataTypes.INTEGER,
        InvMonth: DataTypes.INTEGER,
        VendorID: DataTypes.INTEGER,
        BillFroId: DataTypes.INTEGER,
        BranchCode: DataTypes.STRING,
        BillToId: DataTypes.INTEGER,
        InvoiceNo: DataTypes.STRING,
        PONo: DataTypes.STRING,
        InvDate: DataTypes.DATEONLY,
        BillFroStateCode: DataTypes.INTEGER,
        BillToStateCode: DataTypes.INTEGER,
        VendorName: DataTypes.STRING,
        SaleType: DataTypes.STRING,
        RCM: DataTypes.STRING,
        SelectedBankId: DataTypes.INTEGER,
    }, {});
    sales.associate = function (models) {
        // associations can be defined here
    };
    return sales;
}; 