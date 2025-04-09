import Courts from "../../models/Courts";
import { CourtsDTO } from "../../dtos/Courts";
import { AppError } from "../../errors";

const createCourt = async (newCourt: CourtsDTO) => {
    const { name, location, available } = newCourt;

    const courtResponse = await Courts.create({
        data: {
            name,
            location,
            available
        },
        select: {
            id: true,
            name: true,
            location: true,
            available: true
        }
    });

    return courtResponse;
}

const findAllCourts = async (available: boolean) => {
    if(available) {
        return await Courts.findMany({
            where: {
                available
            },
            select: {
                id: true,
                name: true,
                location: true,
                available: true
            }
        })
    }

    return await Courts.findMany({
        select: {
            id: true,
            name: true,
            location: true,
            available: true
        }
    });
}

const findById = async (id: string) => {
    const court = await Courts.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            location: true,
            available: true
        }
    });

    if(!court) {
        throw new AppError("Court not found!", 404);
    }

    return court;
}

export const courtService = {
    createCourt,
    findAllCourts,
    findById,
    
}