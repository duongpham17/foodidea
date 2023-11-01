import { NextApiResponse } from 'next';
import connectDB from '@database';
import RecipesModel from '@database/models/recipes';
import UserModel from '@database/models/users';
import middleware, {CustomNextApiRequest} from '../../../middleware';

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "GET"){
        const recipes = await RecipesModel.find({user: req.query.id}).sort({timestamp: -1});
        const user = await UserModel.findById(req.query.id);
        return res.status(200).json({
            status: "success",
            data: {
                recipes,
                user
            }
        });
    };

};

export default middleware(handler)