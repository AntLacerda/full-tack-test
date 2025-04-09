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

export const courtService = {
    createCourt,
    
}