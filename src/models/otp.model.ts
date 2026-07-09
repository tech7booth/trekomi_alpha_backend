import { InferSchemaType, model, Schema } from "mongoose";

export const otpSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        otp: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: [
                "EMAIL_VERIFICATION",
                "FORGOT_PASSWORD",
            ],
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true,
        },

        attempts: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

// Automatically remove expired OTPs
otpSchema.index(
    { expiresAt: 1 },
    {
        expireAfterSeconds: 0,
    }
);

export type Otp = InferSchemaType<typeof otpSchema>;

export const OtpModel = model("Otp", otpSchema);