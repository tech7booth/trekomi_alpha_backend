import jwt from "jsonwebtoken";

export function generateAccessToken(payload: {
  userId: string;
  role: string;
}) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
}