'use strict';
module.exports = (sequelize, DataTypes) => {
    var partybranches = sequelize.define('partybranches', {
        PartyId: DataTypes.INTEGER,
        PartyAdrType: DataTypes.STRING,
        PartyGSTIN: DataTypes.STRING,
        PartyAdr: DataTypes.STRING,
        PartyState: DataTypes.STRING,
        PartyStateCode: DataTypes.INTEGER,
        PartyPin: DataTypes.STRING,
        PartyPOC: DataTypes.STRING,
        PartyPhone: DataTypes.STRING,
        PartyEmail: DataTypes.STRING,
    }, {});
    partybranches.associate = function (models) {
        // associations can be defined here
    };
    return partybranches;
}; 