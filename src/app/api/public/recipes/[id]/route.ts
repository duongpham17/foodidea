import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import recipesMODEL from '@database/models/recipes';
import usersMODEL from '@database/models/users';

async function get(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    await connectDB();
    const recipes = await recipesMODEL.findByIdAndUpdate(params.id, {$inc: {views: 1}}, {new: true});
    if(!recipes) return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
    const user = await usersMODEL.findById(recipes.user, 'username').lean();
    return NextResponse.json({ status: "success", data: {recipes, user} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const GET = get;
