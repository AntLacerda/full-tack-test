import { Request, Response } from "express";
import { CourtsDTO } from "../../dtos/Courts";
import { courtService } from "../../services/Courts";
import { AppError } from "../../errors";

const createCourt = async (req: Request, res: Response): Promise<any> => {
    const { name, location, available } = req.body as CourtsDTO;

    try {
        const court = await courtService.createCourt({ name, location, available });
        return res.status(201).json(court);
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }
    
        console.error("Error on create court: ", error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

export const courtController = {
    createCourt,
}