const router = require("express").Router();
const Subject = require("../controllers/subject.controller");
const Exercise = require("../controllers/exercise.controller");
const Security = require("../middleware/security");
const Upload = require("../middleware/uploadExercise");


router.get("/all", Subject.getAllSubject);
router.get("/:subjectId", Subject.getSubject);

router.post("/exercise/:subjectId",Security.decodeJWT,Upload,Exercise.uploadExercise);

module.exports = router;
