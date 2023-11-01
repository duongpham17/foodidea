import React, { useEffect, useState, createContext } from 'react';
import { IFavouritesResponse } from '@database/models/favourites';
import { api } from '@database/api';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    loading: boolean,
    favourites: IFavouritesResponse[] | null,
    onFavouriteSave: ({ recipeID, followID, name, image }: Partial<IFavouritesResponse>) => Promise<void>,
    onFavouriteRemove: (id: string) => Promise<void>
};

// for consuming in children components, initial return state
export const Context = createContext<PropsContextTypes>({
    loading: false,
    favourites: null,
    onFavouriteSave: async ({ recipeID, followID, name, image }) => await new Promise(resolve => resolve), 
    onFavouriteRemove: async ( id: string ) => await new Promise(resolve => resolve)
});

export const useFavourites = ({children}: Props) => {

    const [loading, setLoading] = useState(false);

    const [favourites, setFavourites] = useState<IFavouritesResponse[] | null>(null);

    useEffect(() => {
        const storage = typeof window === "undefined" ? "" :  localStorage.getItem("user");
        const user = storage ? JSON.parse(storage) : null;
        if(!user) return;
        (async () => {
            try{
                const response = await api.get("/favourites");
                setFavourites(response.data.data);
            } catch(err: any){
                console.log(err.response)
            }
        })();
    }, []);

    const onFavouriteSave = async ({recipeID, followID, name, image}: Partial<IFavouritesResponse>) => {
        if(loading) return;
        try{
            setLoading(true);
            const response = await api.post('/favourites', {recipeID, followID, name, image});
            setFavourites(state => ( state ? [response.data.data, ...state] : [response.data.data]));
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    };

    const onFavouriteRemove = async (id: string) => {
        if(loading) return;
        try{
            setLoading(true);
            await api.delete(`/favourites/${id}`);
            setFavourites(state => state ? state.filter(el => el._id !== id) : []);
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