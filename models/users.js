'use strict';
module.exports = (sequelize, DataTypes) => {
    var users = sequelize.define('users', {
        NameOfUser: DataTypes.STRING,
        UserRole: DataTypes.STRING,
        UserName: DataTypes.STRING,
        Password: DataTypes.STRING,
    }, {});
    users.associate = function (models) {
        // associations can be defined here
    };
    return users;
}; 