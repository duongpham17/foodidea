import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import UserModel, {IUsersResponse} from '@database/models/users';

export interface CustomNextApiRequest extends NextApiRequest {
  user?: IUsersResponse;
}

export default function middleware(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {

    let token: string = "";

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    };

    if(!token && req.method === "GET") return await handler(req, res);

    if(!token) return res.status(401).json({ message: 'Unauthorized' });;

    const jwt_secret = process.env.JWT_SECRET as string;

    const decodedId = jwt.verify(token, jwt_secret) as any;

    const existingUser = await UserModel.findById(decodedId.id);

    if(!existingUser) return res.status(401).json({ message: 'Unauthorized' });

    req.user = existingUser;

    await handler(req, res);
  };
}
