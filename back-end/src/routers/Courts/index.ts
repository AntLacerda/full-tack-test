import Router from "express";
import { courtController } from "../../controllers/Courts";
import authorization from "../../middlewares/Authorization";
import { authentication } from "../../middlewares/Authentication";

const courtsRouter = Router();

courtsRouter.post("/save", authentication, authorization, courtController.createCourt);
courtsRouter.get("/", authentication, courtController.findAllCourts);
courtsRouter.get("/:id", authentication, courtController.findById);
courtsRouter.put("/:id", authentication, authorization, courtController.update);
courtsRouter.patch("/:id/availability", authentication, authorization, courtController.updateAvailability);
courtsRouter.delete("/:id", authentication, authorization, courtController.remove);

export default courtsRouter;