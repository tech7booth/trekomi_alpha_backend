import { FastifyInstance } from "fastify";
import { getMyProfile } from "../controllers/user.controller";

export default async function profileRoutes(fastify: FastifyInstance) {
    fastify.get("/me", { preHandler: fastify.authenticate }, getMyProfile);
}