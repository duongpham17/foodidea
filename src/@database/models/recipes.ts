import mongoose, {Schema, model, Types, Document} from 'mongoose';

export interface IRecipesApi {
    _id: string | Types.ObjectId,
    user: string | Types.ObjectId,
    name: string,
    image: string[],
    views: number,
    favourites: number,
    category: string,
    duration: number,
    ingredients: string,
    instructions: string,
    timestamp: number,
};

export interface IRecipesDocument extends Document, IRecipesApi {
    _id: Types.ObjectId,
};

const schema = new Schema<IRecipesDocument>({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String,
        default: "unknown"
    },
    image: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        lowercase: true,
        default: "",
    },
    favourites :{
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 0
    },
    ingredients: {
        type: String,
        default: ""
    },
    instructions: {
        type: String,
        default: ""
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Recipes =  mongoose.models.Recipes || model<IRecipesDocument>('Recipes', schema);

export default Recipes;