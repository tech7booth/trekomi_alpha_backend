import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";
import { ApiError } from "../utils/apiUtil";

const JWT_SECRET = process.env.JWT_SECRET!;

async function authenticate(app: FastifyInstance) {
    app.decorate(
        "authenticate",
        async (request: FastifyRequest, reply: FastifyReply) => {

            const token = request.cookies.jwt || request.headers.authorization?.split(" ")[1];

            console.log(request.headers, "--- headers");

            if (!token) {
                throw new ApiError("No token provided");
            }

            const decoded = jwt.verify(token, JWT_SECRET) as unknown as { userId: string; role: string };

            const user = await UserModel.findById(decoded.userId);

            if (!user) {
                throw new ApiError("User not found");
            }
            request.user = { ...decoded, role: user.role }; // attach user to request

        }
    )
}

export default fp(authenticate);