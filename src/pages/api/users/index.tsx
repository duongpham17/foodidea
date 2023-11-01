import { NextApiResponse } from 'next';
import connectDB from '@database';
import UserModel from '@database/models/users';
import middleware, {CustomNextApiRequest} from '../middleware';

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "PATCH"){
        if(req.user){

            const data = await UserModel.findByIdAndUpdate(req.user._id, req.body, {new: true});

            return res.status(200).json({
                status: "success",
                data
            });
        };
        return res.status(400).json({
            status: "failure",
            message: "Failed to authenticate user"
        });
    };

};

export default middleware(handler)