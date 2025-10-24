"use client";

import React, { useEffect, useState, createContext } from 'react';
import { api } from '@database/api';
import { IRecipesApi } from '@database/models/recipes';
import { useParams } from 'next/navigation';

interface Props {
  children: React.ReactNode,
};

export interface PropsContextTypes {
  loading: boolean,
  recipes: IRecipesApi | null,
  setRecipes: React.Dispatch<React.SetStateAction<IRecipesApi | null>>,
  edit: IRecipesApi | null,
  setEdit: React.Dispatch<React.SetStateAction<IRecipesApi | null>>,
  mode: string,
  setMode: React.Dispatch<React.SetStateAction<string>>,
  updateRecipes: (recipe: IRecipesApi) => Promise<void>,
  removeRecipes: () => Promise<void>
};

export const Context = createContext<PropsContextTypes>({
  loading: false,
  recipes: null,
  setRecipes: () => null,
  edit: null,
  setEdit: () => null,
  mode: "edit",
  setMode: () => null,
  removeRecipes: async () => {},  
  updateRecipes: async () => {}
});

export const UseDashboardContext = ({ children }: Props) => {

  const params = useParams();

  const [recipes, setRecipes] = useState<IRecipesApi | null>(null);
  const [edit, setEdit] = useState<IRecipesApi | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("edit");

  useEffect(() => {
    (async () => {
      try{
        const res = await api.get(`/private/recipes/${params.id}`);
        setRecipes(res.data.data);
      } catch(err:any){
        console.log(err.response)
      }
    })();
  }, [params.id]);

  const updateRecipes = async (recipe: IRecipesApi) => {
    setLoading(true);
    await api.patch(`/private/recipes`, recipe);
    setRecipes(recipe);
    setEdit(recipe);
    setLoading(false);
  };

  const removeRecipes = async () => {
    setLoading(true);
    await api.delete(`/private/recipes/${recipes?._id}`);
    setRecipes(null);
    setLoading(false);
  };

  const value = {
    recipes,
    setRecipes,
    removeRecipes,
    updateRecipes,
    loading,
    edit,
    setEdit,
    mode,
    setMode,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default UseDashboardContext;