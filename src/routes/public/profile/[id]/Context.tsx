"use client";
  
import React, { useEffect, useState, createContext } from 'react';
import { useSearchParams } from "next/navigation";
import { api } from '@database/api';
import { IRecipesApi } from '@database/models/recipes';
import { IUsersApi } from '@database/models/users';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    recipes: IRecipesApi[] | [],
    setRecipes: React.Dispatch<React.SetStateAction<IRecipesApi[] | []>>,
    user: IUsersApi | null,
    setUser: React.Dispatch<React.SetStateAction<IUsersApi | null>>,
};

export const Context = createContext<PropsContextTypes>({
    recipes: [],
    setRecipes: () => null,
    user: null,
    setUser: () => null,
});

export const UseRecipesId = ({ children }: Props) => {

    const searchParams = useSearchParams();

    const [recipes, setRecipes] = useState<IRecipesApi[] | []>([]);
    const [user, setUser]= useState<IUsersApi | null>(null)

    useEffect(() => {
        (async () => {
            const id = window.location.pathname.split("/")[2];
            const [page, limit] = [searchParams.get("page"), searchParams.get("limit")];
            const res = await api.get(`/public/profile/${id}?page=${page}&limit=${limit}`);
            setRecipes(res.data.data.recipes);
            setUser(res.data.data.user);
        })();
    }, [searchParams]);

    const value = {
        recipes,
        setRecipes,
        user,
        setUser,
    };

    return (
        <Context.Provider value={value}>
        {children}
        </Context.Provider>
    );
};

export default UseRecipesId;