
import { Unauthorized } from "./error";
import jwt from "jsonwebtoken";

export default async function authorizeMiddleWare(req, res, next) {
    const AuthorizedHeaders = req.headers.authorization;
    if (!AuthorizedHeaders || !AuthorizedHeaders.startsWith('Auth')){
        throw new Unauthorized('Invalid credentials.');
    }
    const token = AuthorizedHeaders.split(' ')[1];
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: verify.userID, name: verify.name };
        next();
    } catch (error) {
        throw new Unauthorized('Did not verify token.');
    }
}