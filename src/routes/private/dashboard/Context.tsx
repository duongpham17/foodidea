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
  loading: boolean,
  user: IUsersApi | null,
  recipes: IRecipesApi[] | [],
  setRecipes: React.Dispatch<React.SetStateAction<IRecipesApi[] | []>>,
  addRecipes: (recipe: IRecipesApi) => Promise<void>,
  updateRecipes: (recipe: IRecipesApi) => Promise<void>,
  removeRecipes: (id: string) => Promise<void>
};

export const Context = createContext<PropsContextTypes>({
  loading: false,
  user: null,
  recipes: [],
  setRecipes: () => null,
  addRecipes: async () => {},
  removeRecipes: async () => {},  
  updateRecipes: async () => {}
});

export const UseDashboardContext = ({ children }: Props) => {

  const searchParams = useSearchParams();
  
  const [user, setUser] = useState<IUsersApi | null>(null)
  const [recipes, setRecipes] = useState<IRecipesApi[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try{
        const [page, limit] = [searchParams.get("page"), searchParams.get("limit")];
        const res = await api.get(`/private/recipes?page=${page}&limit=${limit}`);
        setRecipes(res.data.data.recipes);
        setUser(res.data.data.user);
      } catch(err:any){
        console.log(err.response)
      }
    })();
  }, [searchParams]);

  const addRecipes = async () => {
    setLoading(true);
    const res = await api.post("/private/recipes");
    const {recipe, user} = res.data.data;
    setUser(user);
    setRecipes(state => state.length ? [recipe, ...state] : [recipe]);
    setLoading(false);
  };
  const updateRecipes = async (recipe: IRecipesApi) => {
    setLoading(true);
    await api.patch(`/private/recipes`);
    setRecipes(state => state.length ? state.map(el => el._id === recipe._id ? recipe : el) : [recipe]);
    setLoading(false);
  };
  const removeRecipes = async (id: string) => {
    setLoading(true);
    await api.delete(`/private/recipes/${id}`);
    setRecipes(state => state.length ? state.filter(el => el._id !== id) : []);
    setLoading(false);
  };

  const value = {
    user,
    recipes,
    setRecipes,
    addRecipes,
    removeRecipes,
    updateRecipes,
    loading,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default UseDashboardContext;