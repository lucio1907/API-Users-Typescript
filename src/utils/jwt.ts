import { sign, verify } from "jsonwebtoken";
import "dotenv/config"

const JWT_SECRET = <string>process.env.SECRET_JWT

const generateToken = async (id: string) => {
    const jwt = sign({ id }, JWT_SECRET, {
        expiresIn: "2h"
    });
    return jwt;
}

const checkToken = async (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
}

export { generateToken, checkToken };