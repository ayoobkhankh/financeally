'use strict';
module.exports = (sequelize, DataTypes) => {
    var selfadresses = sequelize.define('selfadresses', {
        AddressType: DataTypes.STRING,
        Address: DataTypes.STRING,
        State: DataTypes.STRING,
        StateCode: DataTypes.STRING,
        PIN: DataTypes.STRING,
        GSTIN: DataTypes.STRING,
        BranchCode: DataTypes.STRING,
        Phone: DataTypes.STRING,
        POC: DataTypes.STRING,
        Email: DataTypes.STRING,
    }, {});
    selfadresses.associate = function (models) {
        // associations can be defined here
    };
    return selfadresses;
}; 