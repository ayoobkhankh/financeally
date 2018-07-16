'use strict';
module.exports = (sequelize, DataTypes) => {
    var taxes = sequelize.define('taxes', {
        TaxName: DataTypes.STRING,
        TaxDesc: DataTypes.STRING,
        SGSTRate: {
            type: DataTypes.DECIMAL(10, 2)
        },
        CGSTRate: {
            type: DataTypes.DECIMAL(10, 2)
        },
        IGSTRate: {
            type: DataTypes.DECIMAL(10, 2)
        },
        CESSRate: {
            type: DataTypes.DECIMAL(10, 2)
        },
    }, {});
    taxes.associate = function (models) {
        // associations can be defined here
    };
    return taxes;
}; 