import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './connect.js';
import authorizeMiddleWare from './middleware.js';
import session from 'express-session';
import GitHubAuth from './github.js';
import GoogleAuth from './google.js';
import passport from 'passport';
import auth from './auth.js';
import cors from 'cors';
config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// config session.
app.use(session({
    secret: process.env.GITHUB_SECRET,
    resave: true,
    saveUninitialized: true,
}));

app.use(session({
    secret: process.env.GOOGLE_SECRET,
    resave: true,
    saveUninitialized: true,
}));

// initialize the session.
app.use(passport.initialize());
app.use(passport.session());

passport.use(GitHubAuth);
passport.use(GoogleAuth);

// session saved data.
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/auth/github', passport.authenticate('github', { scope: "user" }));
// call back modify to get user data
app.get('/auth/github/callback', 
    
    passport.authenticate("github", { 
        failureRedirect: "/login"
    }) ,(req, res) => {
    res.redirect('/page');
});

app.get('/auth/google', passport.authenticate('google'));
// call back modify to get user data
app.get('/auth/google/callback', 

    passport.authenticate("google", { 
        failureRedirect: "/login"
    }) ,(req, res) => {
    const { id, email, username } = req.user;
    console.log(username);
    res.json({ id, email, username });
});


app.use("/auth/41v", auth);
app.use("/page/41v", auth, authorizeMiddleWare);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    } catch (error) {
        console.log("internal error: ", error);
    }
}

start();