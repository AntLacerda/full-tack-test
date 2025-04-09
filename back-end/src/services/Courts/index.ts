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

const update = async (id: string, courtToUpdate: CourtsDTO) => {
    const { name, location, available } = courtToUpdate;

    const courtExists = await Courts.findUnique({
        where: {
            id,
        }
    });

    if(!courtExists) {
        throw new AppError("Court not found!", 404);
    }

    const updatedCourt = await Courts.update({
        where: {
            id,
        },
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

    if(!updatedCourt) {
        throw new AppError("Error on try to update a court!", 500);
    }

    return updatedCourt;
}

export const courtService = {
    createCourt,
    findAllCourts,
    findById,
    update,
    
}