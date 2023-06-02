import { Router } from "express";
import { createItems, deleteItem, getItem, getItems, updateItem } from "../controllers/users.controller";
import checkSession from "../middlewares/session.middleware";

const router = Router();

router.get('/users', getItems);
router.get('/users/:id', checkSession, getItem);

router.post('/users', checkSession, createItems);
router.post('/users/:id', checkSession, updateItem);

router.delete('/users/:id', checkSession, deleteItem);

export default router;