import Router from "express";
import { userController } from "../../controllers/User";
import authorizarion from "../../middlewares/Authorization";
import { authentication } from "../../middlewares/Authentication";

const userRouter = Router();

userRouter.post("/save", userController.createAdminUser); //removido temporariamente para poder criar adm pela tela do front

export default userRouter;