import { authService } from "../../services/Authentication";
import { Request, Response } from "express";
import { UserDTO } from "../../dtos/User";
import { AppError } from "../../errors";

const signUp = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body as UserDTO;

    try {
        const user = await authService.signUp({ name, email, password });
        return res.status(201).json(user);
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }
    
        console.error("Error on user signup: ", error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

export const authController = {
    signUp,
}