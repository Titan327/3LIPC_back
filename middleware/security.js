const jwt = require("jsonwebtoken");
const Subject = require("../models/subject.model");

const decodeJWT = async (req,res,next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = await Subject.findByPk(decoded["userId"]);

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = {
    decodeJWT
}