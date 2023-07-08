
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config();

export const generateJWT = (user) => {
    const payload = {
        user: {
            id: user.id,
            username: user.username,
        },
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};