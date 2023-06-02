import { Router } from "express";
import { register, loginController } from "../controllers/login.controller";

const router = Router();

router.post('/users/register', register)
router.post('/users/login', loginController)

export default router;