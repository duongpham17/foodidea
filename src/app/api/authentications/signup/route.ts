import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import usersMODEL from '@database/models/users';
import { SIGNUP } from '@database/emails/authentication';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    await connectDB();

    const { email, username } = await req.json();

    // Check if user already exists
    const existingUser = await usersMODEL.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { status: "failed", message: "User already exists. Please login." },
        { status: 400 }
      );
    }

    // Create new user with verified: false by default
    const user = await usersMODEL.create({ email, username, verified: false });

    // Get host URL for verification email link
    const host = req.headers.get('referer');
    if (!host) {
      return NextResponse.json(
        { status: "failed", message: "Could not send email" },
        { status: 400 }
      );
    }
    const host_url = host.split("/").slice(0, 3).join("/");

    // Generate verification code and token
    const { code, hashToken } = await user.createVerifyToken();
    const confirmURL = `${host_url}/confirm/${code}-${hashToken}`;

    // Send signup verification email
    await SIGNUP({ email: user.email, url: confirmURL, host: host_url, code });

    return NextResponse.json(
      { status: "success", message: "sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}
