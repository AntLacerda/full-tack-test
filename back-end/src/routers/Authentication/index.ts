import { Router } from "express";
import { authController } from "../../controllers/Authentication";

const router = Router();

router.post("/signup", authController.signUp);

export default router;