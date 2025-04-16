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
            Permission: {
                select: {
                    role: true,
                }
            }
        }
    });

    return userResponse;
}

const login = async (email: string, password: string) => {
    const user = await User.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            password: true,
            Permission: {
                select: {
                    role: true,
                }
            }
        }
    });

    if(!user) {
        throw new AppError("User not found!", 404);
    }

    const isValidPassword = await compareHashWithPassword(password, user.password);

    if(!isValidPassword) {
        throw new AppError("Invalid password!", 401);
    }

    const token = sign({
        id: user.id,
        email: user.email,
        role: user.Permission.role,
    }, process.env.KEY_SECRET || "secret", {
        expiresIn: "1d",
    });

    return {
        userId: user.id,
        token,
    }
}

export const authService = {
    signUp,
    login,
}
