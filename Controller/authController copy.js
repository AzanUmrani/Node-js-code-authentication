const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../Model/index');
const process = require('process');
require('dotenv').config();

const User = db.user;

const message =
    "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long.";

const createJWTToken = (user_id, email) => {
    return jwt.sign({ user_id, email }, process.env.JWT_SECRET, {
        expiresIn: "12h",
    });
};

// const registerScheme = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string()
//         .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
//         .message(message)
//         .required(),
//     first_name: Joi.string().required(),
//     last_name: Joi.string().required(),
//     role: Joi.string().optional()
// });

const registerScheme = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } }) // TLD check disable for test emails
        .required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'string.empty': 'Email is required.',
        }),
    password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .required()
        .messages({
            'string.pattern.base': message,
            'string.empty': 'Password is required.',
        }),
    first_name: Joi.string().required().messages({
        'string.empty': 'First name is required.',
    }),
    last_name: Joi.string().required().messages({
        'string.empty': 'Last name is required.',
    }),
    role: Joi.string().optional()
});

const loginScheme = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .message(message)
        .required(),
    rememberMe: Joi.boolean().optional()
});

// const register = async (req, res) => {
//     try {
//         const { error, value } = registerScheme.validate(req.body);
//         if (error) {
//             return res.status(400).json({ error: error.message });
//         }

//         const { email, password, first_name, last_name, role } = value;

//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ error: "User with this email already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await User.create({
//             username: `${first_name}${last_name}`, // Auto create username
//             email,
//             first_name,
//             last_name,
//             password: hashedPassword,
//             role: role || "User",
//             active: true,
//         });

//         const token = createJWTToken(newUser.id, newUser.email);

//         res.status(201).json({
//             message: "Registration successful",
//             user: {
//                 id: newUser.id,
//                 username: newUser.username,
//                 email: newUser.email,
//                 first_name: newUser.first_name,
//                 last_name: newUser.last_name,
//             },
//             token,
//         });
//     } catch (error) {
//         console.error("Error in registration:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

const register = async (req, res) => {
    try {
        const { error, value } = registerScheme.validate(req.body, { abortEarly: false }); 
        if (error) {
            return res.status(400).json({
                error: error.details.map(err => err.message) // saare validation errors ek saath bhejne ke liye
            });
        }

        const { email, password, first_name, last_name, role } = value;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: `${first_name}${last_name}`,
            email,
            first_name,
            last_name,
            password: hashedPassword,
            role: role || "user",
            active: true,
        });

        const token = createJWTToken(newUser.id, newUser.email);

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
            },
            token,
        });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { error, value } = loginScheme.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { email, password } = value;

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // if (!existingUser.email_verify) {
        //     return res.status(403).json({ error: "Email is not verified" });
        // }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = createJWTToken(existingUser.id, existingUser.email);
        res.status(200).json({ status: 200, message: "Login successful", token });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    register,
    login
};
