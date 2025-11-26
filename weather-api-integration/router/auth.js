const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const auth = require('../controller/googleAuth');
const userController = require('../controller/userController')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Set httpOnly cookie and redirect to frontend
        const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        res.redirect(FRONTEND);
    }
);
router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
// Helpful GET endpoints to avoid 404s when accidentally visited
router.get('/signUp', (req, res) => {
    res.status(200).json({ message: 'Use POST /auth/signUp with JSON { name, email, password } to create an account.' });
});

router.get('/login', (req, res) => {
    res.status(200).json({ message: 'Use POST /auth/login with JSON { email, password } to obtain a token.' });
});
module.exports = router;
