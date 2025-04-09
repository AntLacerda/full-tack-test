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

const findAllCourts = async (req: Request, res: Response): Promise<any> => {
    const available = req.query.available;

    try {
        const courts = await courtService.findAllCourts(available === "true" ? true : false);
        return res.status(200).json(courts);
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }
    
        console.error("Error on find all courts: ", error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const findById = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    try {
        const court = await courtService.findById(id);
        return res.status(200).json(court);
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }

        console.error("Error on find court by id: ", error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const update = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    const { name, location, available } = req.body as CourtsDTO;

    try {
        const updatedCourt = await courtService.update(id, { name, location, available });
        return res.status(200).json(updatedCourt);
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message});
        }

        console.error("Error on update court: ", error);
        return res.status(500).json({message: "Internal server error!"});
    }
}

const updateAvailability = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    try {
        const updatedCourt = await courtService.updateAvailability(id);
        return res.status(200).json(updatedCourt);
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({message: error.message})
        }
    
        console.error("Error on update availability: ", error);
        return res.status(500).json({message: "Internal server error!"})
    }
}

export const courtController = {
    createCourt,
    findAllCourts,
    findById,
    update,
    updateAvailability
    
}