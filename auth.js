import express from 'express';
import { login, register, getInfoUser } from './controller.js';

const auth = express.Router();

auth.route('/login').post(login);
auth.route('/register').post(register);
auth.route('/router').post(getInfoUser);

export default auth;