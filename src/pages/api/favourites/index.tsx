import { NextApiResponse } from 'next';
import connectDB from '@database';
import FavouritesModel from '@database/models/favourites';
import middleware, {CustomNextApiRequest} from '../middleware';

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "GET"){
        if(req.user){
            const data = await FavouritesModel.find({userID: req.user._id});
            return res.status(200).json({
                status: "success",
                data
            });
        };
        return res.status(400).json({
            status: "failure",
            message: "Failed to find user favourites"
        });
    };

    if(req.method === "POST"){
        if(req.user){
            req.body.userID = req.user._id;
            req.body.followID = req.body.followID;
            req.body.recipeID = req.body.recipeID;
            const data = await FavouritesModel.create(req.body);
            return res.status(200).json({
                status: "success",
                data
            });
        };
        return res.status(400).json({
            status: "failure",
            message: "Failed to create favourite"
        });
    };

    if(req.method === "PATCH"){
        if(req.user){
            const data = await FavouritesModel.findByIdAndUpdate(req.body._id, req.body, {new: true});
            return res.status(200).json({
                status: "success",
                data
            });
        };
        return res.status(400).json({
            status: "failure",
            message: "Failed to update favourite"
        });
    };

};

export default middleware(handler)