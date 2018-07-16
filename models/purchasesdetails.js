'use strict';
module.exports = (sequelize, DataTypes) => {
    var purchasesdetails = sequelize.define('purchasesdetails', {
        PurId: DataTypes.INTEGER,
        ProductId: DataTypes.INTEGER,
        ProductCode: DataTypes.STRING,
        ProductName: DataTypes.STRING,
        ProductType: DataTypes.STRING,
        PricePerUnit: {
            type: DataTypes.DECIMAL(20, 2)
        },
        Qty: {
            type: DataTypes.DECIMAL(20, 2)
        },
        MeasureUnit: DataTypes.STRING,
        MeasureUnitShort: DataTypes.STRING,
        Gross: {
            type: DataTypes.DECIMAL(20, 2)
        },
        SGSTRate: {
            type: DataTypes.DECIMAL(10, 2)
        },
        SGSTAmt: {
            type: DataTypes.DECIMAL(10, 2)
        },
        CGSTRate: {
            type: DataTypes.DECIMAL(10, 2)
        },
        CGSTAmt: {
            type: DataTypes.DECIMAL(10, 2)
        },
        IGSTRate: {
            type: DataTypes.DECIMAL(10, 2)
        },
        IGSTAmt: {
            type: DataTypes.DECIMAL(10, 2)
        },
        CESSRate: {
            type: DataTypes.DECIMAL(10, 2)
        },
        CESSAmt: {
            type: DataTypes.DECIMAL(10, 2)
        },
        TaxTotal: {
            type: DataTypes.DECIMAL(20, 2)
        },
        ItemTotal: {
            type: DataTypes.DECIMAL(20, 2)
        },
    }, {});
    purchasesdetails.associate = function (models) {
        // associations can be defined here
    };
    return purchasesdetails;
}; 