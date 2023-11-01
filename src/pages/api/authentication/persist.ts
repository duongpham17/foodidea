import { NextApiResponse } from 'next';
import connectDB from '@database';
import middleware, {CustomNextApiRequest} from '../middleware';

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {

    await connectDB();

    if(req.method === "GET"){

        if(req.user){
            return res.status(201).json({
                status: "success",
                data: req.user
            });
        } 

        return res.status(401).json({
            status: "failure",
            message: "Failed to authenticate user"
        })

    };

};

export default middleware(handler)