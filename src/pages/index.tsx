import Metadata from '@metadata';
import Home from 'routes/public/home';
import { IRecipesResponse } from '@database/models/recipes';
import { api } from '@database/api';

export interface PropsTypes {
  recipes: IRecipesResponse[] | null
};

export const getServerSideProps = async () => {
  try{
    const recipes = await api.get("/recipes");
    return {
      props: {
        recipes: recipes.data.data || null,
      }
    }
  } catch(err){
    return {
      props: {
        recipes: null,
      }
    }
  };
};

export default function Index(props: PropsTypes) {
  return (
    <>
      <Metadata 
        title="Home" 
        description='Food is life'
      />
      <Home {...props} />
    </>
  )
}