import { Request, Response } from "express";
import { UserDTO } from "../../dtos/User";
import { userService } from "../../services/User";
import { AppError } from "../../errors";

const createAdminUser = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body as UserDTO;

    try {
        const userAdmin = await userService.createAdminUser({ name, email, password });
        return res.status(201).json(userAdmin);
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({message: {message: error.message}});
        }

        console.error("Error on create admin user: ", error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

export const userController = {
    createAdminUser,
    
}