import { NextApiResponse } from 'next';
import connectDB from '@database';
import FavouritesModel from '@database/models/favourites';
import middleware, {CustomNextApiRequest} from '../../middleware';

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "GET"){
        if(req.user){
            const data = await FavouritesModel.findById(req.query.id);
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

    if(req.method === "DELETE"){
        if(req.user){
            const data = await FavouritesModel.findByIdAndDelete(req.query.id);
            return res.status(200).json({
                status: "success",
                data
            });
        };
        return res.status(400).json({
            status: "failure",
            message: "Failed to delete favourite"
        });
    };

};

export default middleware(handler)