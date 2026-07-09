import { FastifyReply, FastifyRequest } from "fastify";
import { UserModel } from "../models/user";
import { ApiError, successResponse } from "../utils/apiUtil";

export const getMyProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.user?.userId;
    const user = await UserModel.findById(userId).select({ "password": 0 }).lean();
    if (!user) throw new ApiError("Unauthorized access !");

    reply.send(successResponse("Profile fetched successfully !", user))
}