const router = require("express").Router();
const Note = require("../controllers/note.controller");
const Security = require("../middleware/security");


router.post("/",/*Security.decodeJWT,*/ Note.createNote);
router.get("/me",Security.decodeJWT, Note.getAllUserNote);


module.exports = router;
