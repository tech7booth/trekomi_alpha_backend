import { FastifyReply, FastifyRequest } from "fastify";
import { loginUser, registerUser } from "../services/auth.services";
import { ApiError, successResponse } from "../utils/apiUtil";
import { sendOTP } from "../services/otp.service";

export async function sendRegistrationOtp(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.body as any ?? {};

    if (!email) throw new ApiError("Missing email !");
    const otp = await sendOTP(email, "EMAIL_VERIFICATION");

    if (!otp.success) throw new ApiError("Unable to send OTP! ");

    reply.send(successResponse("Otp sent successfully !", otp));
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const { email, fullName, password, otp } = request.body as any;
    const data = await registerUser({ email, fullName, password, otp });

    reply.send(successResponse("Registered successfully !", { user: data.user, accessToken: data.accessToken }))
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any || {};

    console.log(email, password, "--", request.body)
    if (!email || !password) throw new ApiError("Email and password are required !");

    const res = await loginUser({ email, password });

    reply.send(successResponse("Logged in successfully !", { user: res.user, accessToken: res.accessToken }));
}