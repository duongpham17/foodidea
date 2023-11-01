import { NextApiResponse } from 'next';
import connectDB from '@database';
import RecipesModel from '@database/models/recipes';
import middleware, {CustomNextApiRequest} from '../../middleware';

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "GET"){
        const data = await RecipesModel.findByIdAndUpdate(req.query.id,  {$inc : {'views' : 1}}).populate("user");
        return res.status(200).json({
            status: "success",
            data
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

    if(req.method === "DELETE"){
        if(req.user){
            const data = await RecipesModel.findByIdAndDelete(req.query.id);
            return res.status(200).json({
                status: "success",
                data
            });
        };
        return res.status(400).json({
            status: "failure",
            message: "Failed to delete recipe"
        });
    };

};

export default middleware(handler)