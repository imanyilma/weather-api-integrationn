const express = require('express')
const dotenv  = require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const app = express();
const weatherRoute = require('./router/weatherRoute')
const morgan = require('morgan')
const passport = require('passport');
const session = require('express-session');
const authRoute = require('./router/auth')
const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(morgan('dev'))
// parse JSON bodies
app.use(express.json());
// parse urlencoded bodies (forms)
app.use(express.urlencoded({ extended: true }));
// Enable CORS for the frontend and allow credentials so cookies are sent
app.use(
    cors({
        origin: FRONTEND,
        credentials: true,
    })
);
app.use(cookieParser())

mongoose.connect(process.env.mongodb_uri , {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.error("Error connecting to MongoDB" , err)
})
app.get('/' , (req , res) => {
    res.send("hello , your server is running")
})
// Helpful route for clients when they hit /api/login
app.get('/api/login', (req, res) => {
    res.status(200).json({
        message: 'Please authenticate. For Google OAuth use /auth/google or POST /api/login with email/password to obtain a token.'
    })
})
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        },
  })
);

// 3️ Initialize Passport
app.use(passport.initialize());

// 4️ Enable Passport session
app.use(passport.session());

// 5️ Mount your Google OAuth routes
app.use('/auth', authRoute);
app.use('/api/weather' , weatherRoute)
// JSON parse error handler (body-parser)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ status: 'fail', message: 'Invalid JSON in request body' });
    }
    next();
});
const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`)
})
