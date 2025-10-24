import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import recipesMODEL from '@database/models/recipes';
import usersMODEL, { IUsersApi } from '@database/models/users';
import middleware from 'app/api/middleware';

async function get(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.pathname.split("/")[4];
    if (!id) return NextResponse.json({ status: "failed", message: "Missing id parameter" }, { status: 400 });
    const recipes = await recipesMODEL.findById(id);
    return NextResponse.json({ status: "success", data: recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  };
};
export const GET = middleware(get);

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

async function remove(req: NextRequest, user: IUsersApi) {
  try {
    await connectDB()
    const id = req.nextUrl.pathname.split("/")[4];
    const recipes = await recipesMODEL.findByIdAndRemove(id);
    await usersMODEL.findByIdAndUpdate(user._id, { $inc: { recipes: -1 } }, { new: true })
    return NextResponse.json({ status: "success", data: { recipes } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const DELETE = middleware(remove);

