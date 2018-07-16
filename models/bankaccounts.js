'use strict';
module.exports = (sequelize, DataTypes) => {
    var bankaccounts = sequelize.define('bankaccounts', {
        AccountName: DataTypes.STRING,
        NameAsPerBank: DataTypes.STRING,
        BankName: DataTypes.STRING,
        AccountType: DataTypes.STRING,
        IFSC: DataTypes.STRING,
        Branch: DataTypes.STRING
    }, {});
    bankaccounts.associate = function (models) {
        // associations can be defined here
    };
    return bankaccounts;
}; 