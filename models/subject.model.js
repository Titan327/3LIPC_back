const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/sql.config');
const Note = require('../models/notes.model')

const SubjectModel = sequelize.define("Subject", {
    id : {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


sequelize.sync().then(() => {
    console.log('Subject table created successfully!');
    async function initData() {
        const subjects = await SubjectModel.findAll();
        if (subjects.length === 0){
            await SubjectModel.create({
                label:"Python",
                imgLink:"https://www.zdnet.fr/wp-content/uploads/zdnet/2024/02/Python202.jpg",
                type:"py",
            });
        }
    }
    initData();

}).catch((error) => {
    console.error('Unable to create table Subject : ', error);
});

module.exports = SubjectModel;