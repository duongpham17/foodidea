"use client";
  
import React, { useEffect, useState, createContext } from 'react';
import { api } from '@database/api';
import { IRecipesApi } from '@database/models/recipes';
import { IUsersApi } from '@database/models/users';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    recipe: IRecipesApi | null,
    setRecipe: React.Dispatch<React.SetStateAction<IRecipesApi | null>>,
    user: IUsersApi | null,
    setUser: React.Dispatch<React.SetStateAction<IUsersApi | null>>
};

export const Context = createContext<PropsContextTypes>({
    recipe: null,
    setRecipe: () => null,
    user: null,
    setUser: () => null,
});

export const UseRecipesId = ({ children }: Props) => {

    const [recipe, setRecipe] = useState<IRecipesApi | null>(null);
    const [user, setUser]= useState<IUsersApi | null>(null)

    useEffect(() => {
        (async () => {
            const id = window.location.pathname.split("/")[2];
            const res = await api.get(`/public/recipes/${id}`);
            const recipe: IRecipesApi = res.data.data.recipes;
            setRecipe(recipe);
            const user = res.data.data.user;
            setUser(user);
        })();
    }, []);

    const value = {
        recipe,
        setRecipe,
        user,
        setUser
    };

    return (
        <Context.Provider value={value}>
        {children}
        </Context.Provider>
    );
};

export default UseRecipesId;