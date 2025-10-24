import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import recipesMODEL from '@database/models/recipes';
import usersMODEL from '@database/models/users';

async function get(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    await connectDB();
    const [ page, limit ] = [ Number(req.nextUrl.searchParams.get("page")), Number(req.nextUrl.searchParams.get("limit")) ];
    const recipes = await recipesMODEL.find({user: params.id}).sort({timestamp: -1}).skip((page-1)*limit).limit(limit);
    const user = await usersMODEL.findById(params.id, "username recipes favourites");
    return NextResponse.json({ status: "success", data: {recipes, user} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const GET = get;
