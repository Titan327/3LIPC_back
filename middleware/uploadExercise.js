const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Submit');
    },
    filename: function (req, file, cb) {
        const originalExt = path.extname(file.originalname);
        cb(null, req.user.id+"-"+req.params.subjectId+originalExt);
    }
});

const upload = multer({ storage: storage });

module.exports = upload.single('file');