import { NextFunction, Request, Response } from "express";
import User from "../../models/User";

const unauthorizedMessage = "You don't have permission to acess this resource!";

const authorizationAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req;

        const user = await User.findUnique({
            where: {
                id: userId as string,
            },
            select: {
                Permission: {
                    select: {
                        role: true,
                    }
                }
            }
        });

        if(user?.Permission.role !== "admin") {
            res.status(403).send({
                message: unauthorizedMessage,
            });
            return;
        }

        next();
    } catch (error) {
        res.status(403).send({
            message: unauthorizedMessage,
            error,
        });
    }
}

export default authorizationAdmin;