import express from 'express';
import { login, register, getInfoUser } from './controller.js';
import passport from 'passport';

const auth = express.Router();

auth.route('/login').post(login);
auth.route('/register').post(register);
auth.route('/router').post(getInfoUser);
auth.route('/github').post(passport.authenticate("github"));
auth.route('/google').post(passport.authenticate("google"));

export default auth;