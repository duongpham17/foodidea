import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@database/connect';
import favouriteMODEL from '@database/models/favourites';
import usersMODEL from '@database/models/users';
import recipesMODEL from '@database/models/recipes';
import { IUsersApi } from '@database/models/users';
import middleware from 'app/api/middleware';

async function get(req: NextRequest, user: IUsersApi) {
  try {
    await connectDB();
    if(!user) return NextResponse.json({ status: "failed", message: "Not allowed" }, { status: 400 }); 
    const favourites = await favouriteMODEL.find({user_id: user._id});
    return NextResponse.json({ status: "success", favourites }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const GET = middleware(get);

async function post(req: NextRequest, user: IUsersApi) {
  try {
    await connectDB();
    if(!user) return NextResponse.json({ status: "failed", message: "Not allowed" }, { status: 400 }); 
    const recipe = await req.json();
    const data = {
        user_id: user._id,
        follow_id: recipe.user,
        recipe_id: recipe._id,
        name: recipe.name,
        image: recipe.image[0],
    };
    const favourites = await favouriteMODEL.create(data);
    await usersMODEL.findByIdAndUpdate(recipe.user, { $inc: { favourites: 1 } }, { new: true });
    await recipesMODEL.findByIdAndUpdate(recipe._id, { $inc: { favourites: 1 } }, { new: true })
    return NextResponse.json({ status: "success", data: {recipe, favourites} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const POST = middleware(post);

async function patch(req: NextRequest, user: IUsersApi) {
  try {
    await connectDB();
    if(!user) return NextResponse.json({ status: "failed", message: "Not allowed" }, { status: 400 }); 
    const favourites = await req.json();
    await favouriteMODEL.findByIdAndDelete(favourites._id);
    await usersMODEL.findByIdAndUpdate(favourites.follow_id, { $inc: { favourites: -1 } }, { new: true });
    await recipesMODEL.findByIdAndUpdate(favourites.recipe_id, { $inc: { favourites: -1 } }, { new: true })
    return NextResponse.json({ status: "success"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: "failed", message: "Internal server error" }, { status: 500 });
  }
};
export const PATCH = middleware(patch);