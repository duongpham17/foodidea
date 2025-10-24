import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import favouriteMODEL from '@database/models/favourites';
import { IUsersApi } from '@database/models/users';
import middleware from 'app/api/middleware';

async function get(req: NextRequest, user: IUsersApi) {
  try {
    await connectDB();
    if(!user) return NextResponse.json({ status: "failed", message: "Not allowed" }, { status: 400 }); 
    const favourites = await favouriteMODEL.find({user_id: user._id});
    return NextResponse.json({ status: "success", data: {favourites} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const GET = middleware(get);