import { createHashPassword, compareHashWithPassword } from "../../utils/Bcrypt";
import User from "../../models/User";
import Permission from "../../models/Permission";
import { AppError } from "../../errors";
import { UserDTO } from "../../dtos/User";

const createAdminUser = async (newUser: UserDTO) => {
    const { name, email, password } = newUser;

    const userExists = await User.findUnique({
        where: {
            email,
        }
    });

    if(userExists) {
        throw new AppError("User already exists!", 409);
    }

    const userPermission = await Permission.findFirst({
        where: {
            role: "admin",
        }
    });

    if(!userPermission) {
        throw new AppError("User permission not found!", 404);
    }

    const userResponse = await User.create({
        data: {
            name,
            email,
            password: await createHashPassword(password),
            Permission: {
                connect: {
                    id: userPermission.id,
                }
            }
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

export const userService = {
    createAdminUser,
}