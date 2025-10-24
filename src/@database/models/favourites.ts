import mongoose, {Schema, model, Types, Document} from 'mongoose';

export interface IFavouritesApi {
    _id: string | Types.ObjectId,
    user_id: string | Types.ObjectId,
    follow_id: string | Types.ObjectId,
    recipe_id: string | Types.ObjectId,
    name: string,
    image: string,
    timestamp: number
};

export interface IFavouritesDocument extends Document, IFavouritesApi  {
    _id: Types.ObjectId,
};

const schema = new Schema<IFavouritesDocument>({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    follow_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    recipe_id: {
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    },
    name: {
        type: String,
    },
    image:{
        type: String
    },
    timestamp: {
        type: Number,
        default: Date.now()
    },
});

const Favourites =  mongoose.models.Favourites || model<IFavouritesDocument>('Favourites', schema);

export default Favourites;