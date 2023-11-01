import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@database';
import UserModel from '@database/models/users';
import { EMAIL_LOGIN, EMAIL_SIGNUP } from '@database/emails/authentication';

export default async function(req: NextApiRequest, res: NextApiResponse){

    await connectDB();

    if(req.method === "POST"){
        const email = req.body.email;

        let user = await UserModel.findOne({email});
    
        const host = req.headers.referer;
        
        if(!host) return res.status(400).json({
            status: "failed",
            message: 'could not send email'
        });
    
        const host_url = host.split("/").slice(0,3).join("/");
    
        if(user){
            const {code, hashToken} = user.createVerifyToken();
    
            const confirmURL = `${host_url}/confirm/${`${code}-${hashToken}`}`;
        
            await EMAIL_LOGIN({
                email: user.email,
                url: confirmURL,
                host: host_url,
                code,
            });
        };
    
        if(!user) {
            user = await UserModel.create({ email, verified: false });
    
            const {code, hashToken} = user.createVerifyToken();
    
            const confirmURL = `${host_url}/confirm/${code}-${hashToken}`;
        
            await EMAIL_SIGNUP({
                email: user.email,
                url: confirmURL,
                host: host_url,
                code
            });
        };
    
        res.status(200).json({
            status: "success",
            message: "sent"
        });
    };

};