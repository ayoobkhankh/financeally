'use strict';
module.exports = (sequelize, DataTypes) => {
    var products = sequelize.define('products', {
        ProductName: DataTypes.STRING,
        ProductDesc: DataTypes.STRING,
        ProductType: DataTypes.STRING,
        ProductCodeType: DataTypes.STRING,
        ProductCode: DataTypes.STRING,
        TaxClassId: DataTypes.INTEGER,
        MeasureUnit: DataTypes.STRING,
        MeasureUnitShort: DataTypes.STRING,
        SalePrice: {
            type: DataTypes.DECIMAL(20, 2)
        },
    }, {});
    products.associate = function (models) {
        // associations can be defined here
    };
    return products;
}; 