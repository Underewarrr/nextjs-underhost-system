import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received request:', req.method, req.body);

  if (req.method !== "POST") {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('User fetched:', user);

    if (!user) {
      console.log('Invalid email');
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
    console.log('Token generated:', token);

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
