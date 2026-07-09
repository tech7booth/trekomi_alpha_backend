import bcrypt from "bcryptjs";
import { OtpModel } from "../models/otp.model";
import { generateOTP } from "../utils/generateOtp";
import { sendEmail } from "../utils/sendEmail";
import { ApiError } from "../utils/apiUtil";

export async function sendOTP(
    email: string,
    type: "EMAIL_VERIFICATION" | "FORGOT_PASSWORD"
) {
    // Remove old OTP
    await OtpModel.deleteMany({
        email,
        type,
    });

    const otp = generateOTP();

    const hashedOTP = await bcrypt.hash(otp, 10);

    await OtpModel.create({
        email,
        otp: hashedOTP,
        type,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    console.log("OTP is -- ", otp);

    await sendEmail({
        to: email,
        subject: "Your OTP Code",
        html: `
      <h2>Your Verification Code</h2>

      <h1>${otp}</h1>

      <p>This OTP will expire in 10 minutes.</p>
    `,
    });

    return {
        success: true,
        message: "OTP sent successfully.",
    };
}

export async function verifyOTP(
    email: string,
    otp: string,
    type: "EMAIL_VERIFICATION" | "FORGOT_PASSWORD"
) {
    const record = await OtpModel.findOneAndUpdate(
        { email, type },
        {
            $inc: {
                attempts: 1,
            },
        },
        {
            new: true,
        }
    );

    if (!record) {
        throw new ApiError("OTP not found.");
    }

    if (record.attempts >= 5) {
        await record.deleteOne();
        throw new ApiError("Too many attempts.");
    }

    if (record.expiresAt.getTime() < Date.now()) {
        await record.deleteOne();

        throw new ApiError("OTP has expired.");
    }

    const matched = await bcrypt.compare(
        otp,
        record.otp
    );

    if (!matched) {
        throw new ApiError("Invalid OTP.");
    }

    await record.deleteOne();

    return {
        verified: true,
    };
}



