import express from 'express';
import { login, register } from './controller.js';

const auth = express.Router();

auth.route('/login').post(login);
auth.route('/register').post(register);

export default auth;