import mongoose, {Schema, model, Types, Document} from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export interface IUsersResponse {
    _id: string,
    email: string,
    username: string,
    image: string,
    role: "user" | "admin",
    verified: boolean,
    code: string,
    confirmation: string,
    confirmation_expiration: number,
    createdAt: Date,
}

export interface IUsers extends Partial<Document>  {
    _id: Types.ObjectId,
    email: string,
    username: string,
    image: string,
    role: "user" | "admin",
    verified: boolean,
    code: string,
    confirmation: string,
    confirmation_expiration: number,
    createdAt: Date,
    correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>,
    createVerifyToken: () => {hashToken: string, code: string}
};

const schema = new Schema<IUsers>({
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    image: {
        type: String,
        default: "",
    },
    username: {
        type: String,
        default: "unknown"
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user",
    },
    verified: {
        type: Boolean
    },
    code: {
        type: String,
        select: false,
    },
    confirmation: {
        type: String
    },
    confirmation_expiration:{
        type: Number,
        default: Date.now() + (1 * 60 * 60 * 1000),
    },
    createdAt: {
        type: Date,
        default: new Date
    },
});

//hashing the code
schema.pre('save', async function(next){
    //only run this when password has been modified
    if(!this.code) return next();

    //hash password
    this.code = await bcrypt.hash(this.code, 12);

    next();
});

//check if confirm code matches the encrypted code.
schema.methods.correctPassword = async function(candidateCode: string, userCode: string): Promise<boolean>{
    console.log(candidateCode, userCode)
    return bcrypt.compare(candidateCode, userCode)
};

//generate a random token to verify users email
schema.methods.createVerifyToken = function(){
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const hashToken = crypto.createHash('sha256').update(verifyToken).digest('hex');

    const code = Math.floor(100000 + Math.random() * 900000);

    //given to user to verify account
    this.code = code;
    this.confirmation = hashToken;
    
    //link will expire timer in 5min
    this.confirmation_expiration = Date.now() + ( 5 * 60 * 1000);

    this.save();

    return {hashToken, code};

};

const Users =  mongoose.models.Users || model<IUsers>('Users', schema);

export default Users;