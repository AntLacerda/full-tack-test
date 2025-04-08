import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { compareHashWithPassword, createHashPassword } from "../../utils/Bcrypt";
import { UserDTO } from "../../dtos/User";
import User from "../../models/User";
import Permission from "../../models/Permission";
import { AppError } from "../../errors";

const prisma = new PrismaClient();

const signUp = async (newUser: UserDTO) => {
    const { name, email, password } = newUser;

    const userExists = await User.findUnique({
        where: {
            email,
        }
    });

    if(userExists) {
        throw new AppError("User already exists!", 409);
    }

    const hashPassword = await createHashPassword(password);

    const userPermission = await Permission.findFirst({
        where: {
            role: "user",
        }
    });

    if(!userPermission) {
        throw new AppError("User permission not found!", 404);
    }

    const userResponse = await User.create({
        data: {
            name,
            email,
            password: hashPassword,
            permission_id: userPermission.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            permission_id: true,
        }
    });

    return userResponse;
}

export const authService = {
    signUp,
}
