import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import userMODEL, { IUsersApi } from '@database/models/users';

export default function middleware(handler: (req: NextRequest, user: any) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    let token;
    if (req.headers.get('authorization')?.startsWith('Bearer')) {
      token = req.headers.get('authorization')!.split(' ')[2];
    };
    if (!token && req.method === "GET") {
      return handler(req, null); 
    };
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    };
    try {
      const jwt_secret = process.env.JWT_SECRET || '';
      const decoded = jwt.verify(token, jwt_secret) as any;
      const user: IUsersApi | null = await userMODEL.findById(decoded.id);
      if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      return handler(req, user);
    } catch (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  };
};
