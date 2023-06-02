import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface RequestExtended extends Request {
    user?: JwtPayload | { id: string };
}

export default RequestExtended;