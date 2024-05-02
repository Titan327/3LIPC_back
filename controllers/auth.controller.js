const Joi = require("joi");
const User = require("../models/users.model")
const Bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

    try {
        const {firstName, lastName, email, password} = req.body;

        const schema = Joi.object({
            firstName: Joi.string().alphanum().required(),
            lastName: Joi.string().alphanum().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(10).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&-]+$/).required()
        });

        const {error} = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const emailIsAlreadyInDb = await User.findOne({where: {email: req.body.email}});
        if (emailIsAlreadyInDb) {
            return res.status(409).send({message: "Email already taken"});
        } else {

            const salt = await Bcrypt.genSalt(12);
            const passwordHash = await Bcrypt.hash(password, salt);

            await User.create({
                firstName,
                lastName,
                email,
                password: passwordHash
            });
        }
        res.status(200).send({message: "User registered successfully"})
    }catch (e){
        res.status(500).send({message: "Internal server error"})
    }
}

const login = async (req, res) => {

    try {
        const {email, password} = req.body;
        const schema = Joi.object({
            email: Joi.required(),
            password: Joi.required()
        });

        const {error} = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({where: {email: email}});

        if (user) {
            Bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).send({message: "Internal error server"})
                } else if (result) {

                    const secretKey = process.env.JWT_KEY;

                    const payload = {
                        userId: user.id
                    };
                    const options = {
                        expiresIn: '24h'
                    };
                    const token = jwt.sign(payload, secretKey, options);

                    res.status(200).send({message: token})
                } else {
                    res.status(500).send({message: "Wrong password"})
                }

            });
        }
    }catch (e){
        res.status(500).send({message: "Internal server error"})
    }
}

module.exports = {
    register,
    login
}