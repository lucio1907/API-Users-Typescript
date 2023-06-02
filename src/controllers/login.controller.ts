import { Request, Response } from "express";
import handleError from "../utils/handleError";
import classLogin from "../services/login.service";

const register = async (req: Request, res: Response) => {
    try {
        const newItem = await classLogin.makeRegister(req.body);
        if (newItem === "ALREADY_USER") return res.status(400).json({ message: "User already exists" })
        if (newItem === "EMPTY_FIELDS") return res.status(400).json({ message: "Cannot be empty fields, please check out and send it again" })
        return res.status(201).json({ user: newItem });
    } catch (error: any) {
        handleError(res, error._message);
    }
}

const loginController = async (req: Request, res: Response) => {
    try {
        const login = await classLogin.makeLogin(req.body);
        if (login === "NONEXISTENT_NUMBER") return res.status(400).json({ message: "Nonexistent number" });
        if (login === "INCORRECT_PASSWORD") return res.status(400).json({ message: "Incorrect password" });
        return res.status(200).json(login);
    } catch (error) {        
        handleError(res, error)
    }
}

export { register, loginController };