import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import recipesMODEL from '@database/models/recipes';
import usersMODEL from '@database/models/users';
import { IUsersApi } from '@database/models/users';
import middleware from 'app/api/middleware';

async function get(req: NextRequest, user: IUsersApi) {
  try {
    await connectDB();
    if(!user) return NextResponse.json({ status: "failed", message: "Not allowed" }, { status: 400 }); 
    const [ page, limit ] = [ Number(req.nextUrl.searchParams.get("page")), Number(req.nextUrl.searchParams.get("limit")) ];
    const recipes = await recipesMODEL.find({user: user._id}).sort({timestamp: -1}).skip((page-1)*limit).limit(limit);
    return NextResponse.json({ status: "success", data: {recipes, user} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const GET = middleware(get);

async function post(req: NextRequest, user: IUsersApi) {
  try {
    await connectDB();
    if(!user) return NextResponse.json({ status: "failed", message: "Not allowed" }, { status: 400 }); 
    const recipe = await recipesMODEL.create({user: user._id});
    const updatedUser = await usersMODEL.findByIdAndUpdate(user._id, { $inc: { recipes: 1 } }, { new: true })
    return NextResponse.json({ status: "success", data: {recipe, user: updatedUser} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const POST = middleware(post);

async function patch(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json();
    const recipe = await recipesMODEL.findByIdAndUpdate(body._id, body, { new: true });
    return NextResponse.json({ status: "success", data: {recipe} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const PATCH = middleware(patch);
