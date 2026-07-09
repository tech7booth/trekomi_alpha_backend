import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "../utils/apiUtil";

export function errorHandler(error: any, request: FastifyRequest, reply: FastifyReply) {
    let statusCode = 500;
    let message = "Internal Server Error";

    console.error("error from error handler:", error);
    // Custom error
    if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
    }

    // Mongoose errors
    if (error.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(error.errors)
            .map((val: any) => val.message)
            .join(", ");
    }

    if (error.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value entered";
    }

    // JWT errors
    if (error.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    reply.status(statusCode).send({
        success: false,
        message,
    });
}