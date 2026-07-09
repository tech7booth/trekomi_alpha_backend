import bcrypt from "bcryptjs";

import { UserModel } from "../models/user";
import { verifyOTP } from "./otp.service";

import { generateAccessToken } from "../utils/jwt";

interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  otp: string;
}

export async function registerUser(data: RegisterDto) {
  const { fullName, email, password, otp } = data;

  // Check if user already exists
  const existingUser = await UserModel.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  // Verify OTP
  await verifyOTP(
    email,
    otp,
    "EMAIL_VERIFICATION"
  );

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await UserModel.create({
    fullName,
    email,
    password: hashedPassword,
    isVerified: true,
  });

  // Generate JWT
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user,
    accessToken,
  };
}

interface LoginDto {
  email: string;
  password: string;
}

export async function loginUser(data: LoginDto) {
  const { email, password } = data;

  // Find user
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  // Generate JWT
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user,
    accessToken,
  };
}