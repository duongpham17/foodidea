import mongoose, {Schema, model, Types, Document} from 'mongoose';

export interface IFavouritesResponse {
    _id: string,
    userID: string,
    followID: string,
    recipeID: string,
    name: string,
    image: string,
    timestamp: number
};

export interface IFavourites extends Partial<Document>  {
    _id: Types.ObjectId,
    userID: Types.ObjectId,
    followID: Types.ObjectId,
    recipeID: Types.ObjectId,
    name: string,
    image: string,
    timestamp: number
};

const schema = new Schema<IFavourites>({
    userID:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    followID: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    recipeID: {
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

const Favourites =  mongoose.models.Favourites || model<IFavourites>('Favourites', schema);

export default Favourites;