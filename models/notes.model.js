const { DataTypes, Model, associations } = require('sequelize');
const sequelize = require('../configurations/sql.config');
const Subject = require('./subject.model');
const User = require('../models/users.model');

const NoteModel = sequelize.define("Note", {
    id : {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_user: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_subject: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

/*
Subject.hasMany(NoteModel, { foreignKey: 'id_subject' });
NoteModel.hasMany(Subject, { foreignKey: 'id_subject' });
NoteModel.belongsTo(Subject, { foreignKey: 'id_subject' });
*/



Subject.hasMany(NoteModel, { foreignKey: 'id_subject' });
NoteModel.belongsTo(Subject, { foreignKey: 'id_subject' });


sequelize.sync().then(() => {
    console.log('Note table created successfully!');
}).catch((error) => {
    console.error('Unable to create table Note : ', error);
});

module.exports = NoteModel;
