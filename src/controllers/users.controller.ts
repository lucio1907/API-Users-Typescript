import { Request, Response } from "express";
import users from "../services/users.service";
import handleError from "../utils/handleError";

const getItems = async (req: Request, res: Response) => {
    try {
        const getItems = await users.getUsers();
        if (getItems === "NONEXISTENT_USERS") return res.status(404).json({ message: "Nonexistent users, try to make new one" });
        res.json(getItems);
    } catch (error) {
        handleError(res, error);
    }
}

const createItems = async (req: Request, res: Response) => {
    try {
        const newItem = await users.createUsers(req.body);
        
        if (newItem === "ALREADY_USER") return res.status(400).json({ message: "User already exists" })
        return res.json({ newUser: newItem })
    } catch (error) {
        console.error(error);
        
        handleError(res, error);
    }
}

const getItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const getItem = await users.getUser(id);  
        
        if (getItem === "USER_NOT_FOUND") return res.status(404).json({ message: "User not found, check out if the _id it's written right" })
        return res.json(getItem);
    } catch (error: any) {
        handleError(res, error.message);
    }
}

const updateItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const updatedItem = await users.updateUsers(id, body);

        if (updatedItem === "ALREDY_USER") return res.status(400).json({ message: "That user has been updated" });
        if (updatedItem === "INVALID_ID") return res.status(400).json({ message: "Invalid ID, please try with a valid id" });
        if (updatedItem === "EMPTY_FIELDS") return res.status(400).json({ message: "Empty fields" });

        return res.json(updatedItem);
    } catch (error: any) {
        handleError(res, error.message);
    }
};

const deleteItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userDeleted = await users.deleteUser(id);
        if (userDeleted === "USER_NOT_FOUND") return res.status(404).json({ message: "User not founded" });
        return res.json(userDeleted);
    } catch (error: any) {
        handleError(res, error.message);
    }
};

export { getItems, createItems, getItem, updateItem, deleteItem };