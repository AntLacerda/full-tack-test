import { Request, Response } from "express";

interface CustomError extends Error {
    statusCode?: number;
}

export function errorHandler(
    error: CustomError,
    req: Request,
    res: Response,
) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error!";

    console.error(`${req.method} ${req.url}: ${message}`); 

    res.status(statusCode).json({
        error: {
            message,
            statusCode,
        }
    });
}