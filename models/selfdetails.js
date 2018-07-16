'use strict';
module.exports = (sequelize, DataTypes) => {
    var selfdetails = sequelize.define('selfdetails', {
        SelfName: DataTypes.STRING,
        SelfTagLine: DataTypes.STRING,
        Regno: DataTypes.STRING,
        LogoPath: DataTypes.STRING,
        SelfPAN: DataTypes.STRING
    }, {});
    selfdetails.associate = function (models) {
        // associations can be defined here
    };
    return selfdetails;
}; 