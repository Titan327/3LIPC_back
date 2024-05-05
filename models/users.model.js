const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/sql.config');
const Note = require('../models/notes.model')

const UserModel = sequelize.define("User", {
    id : {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    }
});
/*
UserModel.hasMany(Note, { foreignKey: 'id_user' });
Note.hasMany(UserModel, { foreignKey: 'id_user' });
 */

UserModel.hasMany(Note, { foreignKey: 'id_user' });
Note.belongsTo(UserModel, { foreignKey: 'id_user' });

sequelize.sync().then(() => {
    console.log('UserModel table created successfully!');
}).catch((error) => {
    console.error('Unable to create table UserModel : ', error);
});

module.exports = UserModel;