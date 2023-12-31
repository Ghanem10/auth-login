
import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthorized } from "./error.js";
import SchemaUser from "./schema.js";

export const getInfoUser = async (req, res) => {
    const { name, gmail } = req.body;
    const userData = await SchemaUser.findOne({ gmail });
    res.status(StatusCodes.OK).json({ name: userData });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Email and password are required.");
    }
    const user = await SchemaUser.findOne({ email });
    if (!user) {
        throw new Unauthorized("Email is incorrect!");
    }
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
        throw new Unauthorized("Password is incorrect!");
    }
    const token = await user.createJWT();
    const t = `Bearer ${token}`;
    res.status(StatusCodes.OK).json({ user: user.name, t });
};

export const register = async (req, res) => {
    const email = req.body.email;
    const checkEmail = await SchemaUser.findOne({ email });
    if (checkEmail) {
        res.status(StatusCodes.BAD_REQUEST).json({ mes: "Email already exist!" });
    } else {
        const user = await SchemaUser.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: user.name, token });
    }
};