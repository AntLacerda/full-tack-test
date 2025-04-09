import Router from "express";
import { userController } from "../../controllers/User";
import authorizarion from "../../middlewares/Authorization";
import { authentication } from "../../middlewares/Authentication";

const userRouter = Router();

userRouter.post("/save", authentication, authorizarion, userController.createAdminUser);

export default userRouter;