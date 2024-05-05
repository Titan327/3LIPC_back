const Subject = require("../models/subject.model");

const getAllSubject = async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        res.status(200).send({subjects})
    }catch (e){
        res.status(500).send({message: "Internal server error"})
    }

}

const getSubject = async (req, res) => {
    try {
        const subjects = await Subject.findByPk(req.params.subjectId);
        res.status(200).send({subjects})
    }catch (e){
        res.status(500).send({message: "Internal server error"})
    }
}



module.exports = {
    getAllSubject,
    getSubject
}