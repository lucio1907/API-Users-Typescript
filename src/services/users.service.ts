import UserModel from "../models/user.model";
import User from "../interfaces/user.interfaces";
import { encrypt } from "../utils/hashPassword";

class Users {
    collection: import("mongoose").Model<import("../interfaces/user.interfaces").default, {}, {}, {}, import("mongoose").Document<unknown, {}, import("e:/PruebasTecnicasBackend/Prueba-1/src/interfaces/user.interfaces").default> & Omit<import("e:/PruebasTecnicasBackend/Prueba-1/src/interfaces/user.interfaces").default & { _id: import("mongoose").Types.ObjectId; }, never>, import("mongoose").Schema<import("e:/PruebasTecnicasBackend/Prueba-1/src/interfaces/user.interfaces").default, import("mongoose").Model<import("e:/PruebasTecnicasBackend/Prueba-1/src/interfaces/user.interfaces").default, any, any, any, import("mongoose").Document<unknown, any, import("e:/PruebasTecnicasBackend/Prueba-1/src/interfaces/user.interfaces").default> & Omit<import("e:/PruebasTecnicasBackend/Prueba-1/src/interfaces/user.interfaces").default & { _id: import("mongoose").Types.ObjectId; }, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, import("e:/PruebasTecnicasBackend/Prueba-1/src/interfaces/user.interfaces").default, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<import("e:/PruebasTecnicasBackend/Prueba-1/src/interfaces/user.interfaces").default>> & Omit<import("mongoose").FlatRecord<import("../interfaces/user.interfaces").default> & { _id: import("mongoose").Types.ObjectId; }, never>>>;
    constructor() {
        this.collection = UserModel;
    }

    async getUsers() {
        const getAllUsers = await this.collection.find({}).select("-createdAt -updatedAt");

        if (getAllUsers.length === 0) return "NONEXISTENT_USERS"

        return getAllUsers;
    }

    async getUser(id: string) {
        const getUser = await this.collection.findOne({ _id: id }).select("-createdAt -updatedAt");
        
        if (!getUser) return "USER_NOT_FOUND";

        return getUser;
    }

    async createUsers(body: User) {
        const { email, password } = body;

        const checkIs = await this.collection.findOne({ email });

        if (checkIs) return "ALREADY_USER";

        const hashPassword = await encrypt(password);
        const newRegister = await this.collection.create({
            ...body,
            password: hashPassword,
            session_active: false            
        });

        return newRegister;
    }

    async updateUsers(id: string, body: User) {
        const { first_name, last_name, date_birth, address, password, email, mobile_phone } = body;

        const checkIs = await this.collection.findOne({ email });

        if (checkIs) return "ALREDY_USER"

        const getUserAndUpdate = await this.collection.findOneAndUpdate({ _id: id }, body, { new: true });   
        
        if (!id || id === '') return "INVALID_ID";
        if ([first_name, last_name, date_birth, address, password, email, mobile_phone].includes("")) return "EMPTY_FIELDS";
        
        return getUserAndUpdate;
    }

    async deleteUser(id: string) {
        const userDeleted = await this.collection.findOneAndDelete({ _id: id });
        
        if (userDeleted === null) return "USER_NOT_FOUND";
        
        return userDeleted;
    }
}

const users = new Users();

export default users;