import { NextApiResponse } from 'next';
import connectDB from '@database';
import RecipesModel from '@database/models/recipes';
import middleware, {CustomNextApiRequest} from '../middleware';

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "GET"){
        
        if(req.user){
            const data = await RecipesModel.find({user: req.user._id}).sort({timestamp: -1});

            return res.status(200).json({
                status: "success",
                data
            });
        };

        if(!req.user){
            const data = await RecipesModel.find().sort({timestamp: -1});

            return res.status(200).json({
                status: "success",
                data
            });
        };

        return res.status(400).json({
            status: "failure",
            message: "Failed to find recipes"
        });

    };

    if(req.method === "POST"){
        if(req.user){
            const body = {
                ...req.body,
                user: req.user._id
            };
            const data = await RecipesModel.create(body);

            return res.status(200).json({
                status: "success",
                data
            });
        };
        return res.status(400).json({
            status: "failure",
            message: "Failed to create recipe"
        });
    };

    if(req.method === "PATCH"){
        if(req.user){

            const data = await RecipesModel.findByIdAndUpdate(req.body._id, req.body, {new: true});

            return res.status(200).json({
                status: "success",
                data
            });
        };
        return res.status(400).json({
            status: "failure",
            message: "Failed to update recipe"
        });
    };

};

export default middleware(handler)