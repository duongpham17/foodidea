import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import usersMODEL from '@database/models/users';
import { LOGIN } from '@database/emails/authentication';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const email = body.email as string;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { status: "failed", message: "Email required" },
        { status: 400 }
      );
    };

    let user = await usersMODEL.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { status: "success", message: "invalid user" }, 
        { status: 200 }
      );
    };

    const host = req.headers.get('referer');
    if (!host) {
      return NextResponse.json(
        { status: "failed", message: "could not send email" },
        { status: 400 }
      );
    };
    const host_url = host.split("/").slice(0, 3).join("/");

    const { code, hashToken } = await user.createVerifyToken();
    const confirmURL = `${host_url}/confirm/${code}-${hashToken}`;
    await LOGIN({ email: user.email, url: confirmURL, host: host_url, code });
    return NextResponse.json({ status: "success", message: "sent" }, { status: 200 });
  } catch (error) {
    return NextResponse
  }
}