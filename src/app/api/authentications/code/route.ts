import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import usersMODEL from '@database/models/users';
import jwt from 'jsonwebtoken';

const createSecureToken = (id: string) => {

    const secret: any = process.env.JWT_SECRET;

    const expires: any = process.env.JWT_EXPIRES;

    const token = jwt.sign({ id }, secret, { expiresIn: `${expires}d` });

    const expireInNumber = Date.now() + (expires * 24 * 60 * 60 * 1000);

    const cookie = {
        token: `Bearer ${token}`,
        expires: expireInNumber,
    };

    return cookie;
};

export async function POST(req: NextRequest){

    await connectDB();

    const body = await req.json();
    const {email, code} = body;

    let user = await usersMODEL.findOne({email}).select('+code');

    if(!user) {
      return NextResponse.json(
        { status: "failed", message: "could not send email" },
        { status: 400 }
    )};
    
    const linkExpired = Date.now() > user.confirmation_expiration;
    if(linkExpired) {
      return NextResponse.json(
        { status: "failed", message: "This confirmation code no longer exist" },
        { status: 401 }
    )};

    const correctUser = !user || await user.correctPassword(code, user.code);
    if (!correctUser) {
        return NextResponse.json(
        {status: "failed", message: "Invalid code"},
        {status: 401}
    )};

    user.verified = true;
    user = await usersMODEL.findOneAndUpdate({email}, user, {new: true});
    if(!user) {
        return NextResponse.json(
        {status: "failed", message: "Invalid code"},
        {status: 401}
    )};

    const cookie = createSecureToken(user._id.toString());

    return NextResponse.json(
        {status: "success", data: user, cookie }, 
        {status: 200}
    );
};