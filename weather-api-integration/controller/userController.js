const User = require('../model/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    res.status(statusCode).json({
        status: 'success',
        token,
    });
};

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ status: 'fail', message: 'name, email and password are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({
            status: 'success',
            data: { user: newUser },
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
        }

        const existingUser = await User.findOne({ email }).select('+password');
        if (!existingUser) {
            return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
        }

        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
        }

        createSendToken(existingUser, 200, res);
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return res.status(401).json({ status: 'fail', message: 'You are not logged in' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ status: 'fail', message: 'Invalid or expired token' });
        }

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ status: 'fail', message: 'The user belonging to this token no longer exists' });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

module.exports = { signUp, login, protect };
