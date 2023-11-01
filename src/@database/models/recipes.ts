import mongoose, {Schema, model, Types, Document} from 'mongoose';

export interface IRecipesResponse {
    _id: string,
    user: string,
    name: string,
    image: string,
    views: number,
    duration: number,
    ingredients: string[]
    steps: {_id: string, format: string, data: string}[],
    timestamp: number,
};

export interface IRecipes extends Partial<Document>  {
    _id: Types.ObjectId,
    user: Types.ObjectId,
    name: string,
    duration: number,
    image: string,
    views: number,
    ingredients: string[],
    steps: {format: string, data: string}[],
    timestamp: number
};

const schema = new Schema<IRecipes>({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 0
    },
    ingredients: [{
        type: String
    }],
    steps: [{
        format: String,
        data: String,
    }],
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Recipes =  mongoose.models.Recipes || model<IRecipes>('Recipes', schema);

export default Recipes;