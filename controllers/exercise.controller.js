const Subject = require("../models/subject.model");

const uploadExercise = async (req, res) => {
    try {
        res.status(200).send({message: "File uploaded succesfully"})
    }catch (e){
        res.status(500).send({message: "Internal server error"})
    }
}



module.exports = {
    uploadExercise
}