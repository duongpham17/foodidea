import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import recipesMODEL from '@database/models/recipes';

async function get(req: NextRequest) {
  try {
    await connectDB();
    const name = req.nextUrl.searchParams.get("name")
    const recipes = await recipesMODEL.find({name: {$regex: name, $options: 'i'}});
    return NextResponse.json({ status: "success", data: recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const GET = get;
