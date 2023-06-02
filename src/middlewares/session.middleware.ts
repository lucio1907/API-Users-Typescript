import { NextFunction, Response } from "express";
import RequestExtended from "../interfaces/requestExtended.interface";
import { checkToken } from "../utils/jwt";

const checkSession = async (req: RequestExtended, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop();
        const isUser = await checkToken(`${jwt}`) as unknown as { id: string };
        if (!isUser.id) return res.status(400).json({ message: "Don't have a valid token" });
        else req.user = isUser;
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Invalid Session" });
    }
}

export default checkSession;