import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { TokenPayLoadDTO } from "../../dtos/TokenPayLoad";

export const authentication = async (req: Request & { userId?: string }, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;

    if(!authorization) {
        res.status(401).send({
            message: "Token not provided!",
        });
        return; 
    }

    const [, token] = authorization.split(" ");
    const keySecret = process.env.KEY_SECRET || "secret";

    try {
        const decoded = verify(token, keySecret);
        const { id } = decoded as TokenPayLoadDTO;

        req.userId = id;
        next();
    } catch (error) {
        res.status(401).send({
            message: "Invalid token!",
            error,
        });
    }


};