import express, { Request, Response } from "express";
import cors from "cors";

import authRouter from "../routers/Authentication";


const app = express();

app.use(express.json());
app.use(cors());

const basePathUrlApiV1 = "/api/v1";

app.get(`${basePathUrlApiV1}/hello-world`, (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World" });
    return;
});

app.use("/auth", authRouter);

export default app;