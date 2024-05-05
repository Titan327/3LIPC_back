const Note = require("../models/notes.model");
const Subject = require("../models/subject.model");

const createNote = async (req, res) => {
    try {
        const {idUser,idSubject, note} = req.body;


        Note.create({
            id_user: idUser,
            id_subject: idSubject,
            note: note
        });

        res.status(200).send({message: "Note created"})
    }catch (e){
        res.status(500).send({message: "Internal server error"})
    }

}

const getAllUserNote = async (req, res) => {

    try {
        const notes = await Note.findAll({
            where: {
                id_user: req.user.id
            },
            include: {
                model: Subject,
                attributes: ['label']
            }
        });

        res.status(200).send({notes})
    }catch (e){
        console.log(e);
        res.status(500).send({message: "Internal server error"})
    }

}

module.exports = {
    createNote,
    getAllUserNote
}