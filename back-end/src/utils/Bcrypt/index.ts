import bcrypt from 'bcrypt';

const saltOrRounds: number = 10;

const createHashPassword = async (password: string): Promise<string> => {
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return hashPassword;
}

const compareHashWithPassword = async (password: string, hashPassword: string): Promise<boolean> => {
    const isValidPassword = await bcrypt.compare(password, hashPassword);

    return isValidPassword; 
}

export {
    createHashPassword,
    compareHashWithPassword,
}