import { FastifyInstance } from "fastify";
import { register, sendRegistrationOtp, login } from "../controllers/auth.controller";

export default async function authRoutes(fastify: FastifyInstance){
    fastify.post("/send-otp", sendRegistrationOtp);
    fastify.post("/register", register);

    fastify.post("/login", login)
}