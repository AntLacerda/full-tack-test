import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const basePathUrlApiV1 = "api/v1";

app.get(`${basePathUrlApiV1}/hello`, (req: Request, res: Response) => {
    res.status(200).json({message: "Hello World!"});
    return;
});

export default app;