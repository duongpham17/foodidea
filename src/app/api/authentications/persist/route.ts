import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import usersMODEL from '@database/models/users';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  await connectDB();

  let token;
  if (req.headers.get('authorization')?.startsWith('Bearer')) {
    token = req.headers.get('authorization')!.split(' ')[2];
  };

  if (!token) {
    return NextResponse.json({ status: "failed", message: "Login to access these features" }, { status: 400 });
  };

  const jwt_secret = process.env.JWT_SECRET as string;

  try {
    const decodedId: any = jwt.verify(token, jwt_secret);
    const existingUser = await usersMODEL.findById(decodedId.id);
    if (!existingUser) {
      return NextResponse.json({ status: "failed", message: "User does not exist." }, { status: 400 });
    }
    return NextResponse.json({ status: "success", data: existingUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ status: "failed", message: "Invalid or expired token" }, { status: 401 });
  }
};
