"use client";

import React, { useEffect, useState, createContext } from 'react';
import { IFavouritesApi } from '@database/models/favourites';
import { api } from '@database/api';
import { user_authentication } from '@localstorage';
import { IRecipesApi } from '@database/models/recipes';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    loading: boolean,
    favourites: IFavouritesApi[] | [],
    onFavouriteSave: (recipe: IRecipesApi) => Promise<void>,
    onFavouriteRemove: (favourite: IFavouritesApi) => Promise<void>
};

export const Context = createContext<PropsContextTypes>({
    loading: false,
    favourites: [],
    onFavouriteSave: async (recipe: IRecipesApi) => {},
    onFavouriteRemove: async (favourite: IFavouritesApi) => {}
});

export const useFavourites = ({children}: Props) => {

    const [loading, setLoading] = useState(false);

    const [favourites, setFavourites] = useState<IFavouritesApi[] | []>([]);

    useEffect(() => {
        const storage = typeof window === "undefined" ? "" : user_authentication.get();
        const user = storage || undefined;
        if(!user) return;

        (async () => {
            const res = await api.get('/private/favourites');
            setFavourites(res.data.favourites);
        })();
    }, []);

    const onFavouriteSave = async (recipe:IRecipesApi) => {
        if(loading) return;
        try{
            setLoading(true);
            const res = await api.post('/private/favourites', recipe);
            const favourite = res.data.data.favourites;
            setFavourites(state => ( state.length ? [favourite, ...state] : [favourite]));
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    };

    const onFavouriteRemove = async (favourite: IFavouritesApi) => {
        if(loading) return;
        try{
            setLoading(true);
            await api.patch(`/private/favourites`, favourite);
            setFavourites(state => state ? state.filter(el => el._id !== favourite._id) : []);
            setLoading(false);
        }catch(err){
            console.log(err)
            setLoading(false);
        }
    };

    const value = {
        loading,
        favourites,
        onFavouriteSave,
        onFavouriteRemove
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default useFavourites