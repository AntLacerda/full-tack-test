import express, { Request, Response } from "express";
import cors from "cors";

import authRouter from "../routers/Authentication";
import userRouter from "../routers/User";
import courtRouter from "../routers/Courts";

import { errorHandler } from "../middlewares/Error-handler";


const app = express();

app.use(express.json());
app.use(cors());

const basePathUrlApiV1 = "/api/v1";

app.get(`${basePathUrlApiV1}/hello-world`, (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World" });
    return;
});

app.use("/auth", authRouter);
app.use(`${basePathUrlApiV1}/users`, userRouter);
app.use(`${basePathUrlApiV1}/courts`, courtRouter);

app.use(errorHandler);

export default app;