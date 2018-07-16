'use strict';
module.exports = (sequelize, DataTypes) => {
    var parties = sequelize.define('parties', {
        PartyName: DataTypes.STRING,
        PartyPAN: DataTypes.STRING
    }, {});
    parties.associate = function (models) {
        // associations can be defined here
    };
    return parties;
}; 