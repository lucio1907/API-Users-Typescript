import { hash, compare } from "bcrypt";

const encrypt = async (password: string) => {
    const hashPassword = await hash(password, 8);
    return hashPassword;
}

const verify = async (password: string, passwordHashed: string) => {
    const isCorrect = await compare(password, passwordHashed);
    return isCorrect;
}

export { encrypt, verify };