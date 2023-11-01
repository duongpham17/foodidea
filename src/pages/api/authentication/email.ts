import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import UserModel from '@database/models/users';
import jwt from 'jsonwebtoken';

const createSecureToken = (id: string) => {

    const secret: any = process.env.JWT_SECRET;

    const expires: any = process.env.JWT_EXPIRES;

    const token = jwt.sign({ id }, secret, { expiresIn: `${expires}d` });

    const expireInNumber = Date.now() + (expires * 24 * 60 * 60 * 1000);

    const cookie = {
        token: `Bearer ${token}`,
        expires: expireInNumber,
    };

    return cookie;
};

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "POST"){

        const token = req.body.token;

        const [code, confirmation] = token.split("-");
    
        let user = await UserModel.findOne({confirmation}).select('+code');
    
        if(!user) return res.status(400).json({message: 'could not send email'});
        
        const linkExpired = Date.now() > user.confirmation_expiration;
    
        if(linkExpired) return res.status(401).json({ message: 'This confirmation code no longer exist'});
    
        const correctUser = !user || await user.correctPassword(code, user.code);
    
        if (!correctUser) return res.status(401).json({message: 'Invalid code'});
        
        user.verified = true;

        user = await UserModel.findOneAndUpdate({confirmation}, user, {new: true});
    
        if(!user) return res.status(401).json({message: 'Invalid code'});
    
        const cookie = createSecureToken(user._id.toString());
    
        res.status(200).json({
            status: "success",
            data: user,
            cookie
        });
    };

};