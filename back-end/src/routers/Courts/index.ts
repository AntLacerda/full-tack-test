import Router from "express";
import { courtController } from "../../controllers/Courts";
import authorization from "../../middlewares/Authorization";
import { authentication } from "../../middlewares/Authentication";

const courtsRouter = Router();

courtsRouter.post("/save", authentication, authorization, courtController.createCourt);
courtsRouter.get("/", authentication, courtController.findAllCourts);

export default courtsRouter;