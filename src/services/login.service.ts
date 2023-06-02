import LoginTypes from "../interfaces/login.interface";
import User from "../interfaces/user.interfaces";
import UserModel from "../models/user.model";
import { encrypt, verify } from "../utils/hashPassword";
import { generateToken } from "../utils/jwt";

class Login {
    collection: import("mongoose").Model<User, {}, {}, {}, import("mongoose").Document<unknown, {}, User> & Omit<User & { _id: import("mongoose").Types.ObjectId; }, never>, import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & Omit<User & { _id: import("mongoose").Types.ObjectId; }, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & Omit<import("mongoose").FlatRecord<User> & { _id: import("mongoose").Types.ObjectId; }, never>>>;
    constructor() {
        this.collection = UserModel 
    }

    /**
     * TODO: Make a new account to DB
     * @param body 
     * @returns { User } 
     */
    async makeRegister(body: User) {
        const { email, password, first_name, last_name, date_birth, mobile_phone } = body;

        const checkIs = await this.collection.findOne({ email });

        if (checkIs) return "ALREADY_USER"
        if ([email, password, first_name, last_name, date_birth, mobile_phone].includes("")) return "EMPTY_FIELDS"
        
        const hashPassword = await encrypt(password);
        const newRegister = await this.collection.create({
            ...body,
            password: hashPassword,
            session_active: false
        })
        return newRegister;
    }

    /**
     * TODO: Checks the mobile phone and password to make a login and return a jwt with the user
     * @param body 
     * @returns { User }
     */

    async makeLogin(body: LoginTypes) {
        const { mobile_phone, password } = body;
        let findUser = await this.collection.findOne({ mobile_phone }).select("-createdAt -updatedAt");
        if (!findUser) return "NONEXISTENT_NUMBER"
        
        const hashedPassword = findUser.password
        const checkIsPassword = await verify(password, hashedPassword);

        const token = await generateToken(findUser?.mobile_phone)

        if (token) {
            // Change status session when the account is logged
            if (findUser.session_active === false) {
                const sessionStatus = { session_active: true };
                await this.collection.findOneAndUpdate({ mobile_phone }, sessionStatus, { new: true });
                findUser.session_active = true;
            }

            const data = {
                user: findUser,
                access_token: token,
                token_type: "Bearer"
            }
    
            if (checkIsPassword) return data;
            else return "INCORRECT_PASSWORD"
        }          
    }
}

// Singleton patron
const login = new Login()

export default login;