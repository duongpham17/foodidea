import Metadata from '@metadata';
import Recipe from 'routes/public/recipes/[id]';
import { api } from '@database/api';
import { IRecipes_IUsers } from '@database/types/populate';
import { firstcaps } from '@utils/function';

export interface PropsTypes {
  recipes: IRecipes_IUsers,
};

export const getServerSideProps = async (context: any) => {
  try{
    const response = await api.get(`/recipes/${context.query.id}`);

    return{
      props:{
        recipes: response.data.data || null,
      }
    }
  } catch(err){
    return{
      props:{
        recipes: null,
      }
    }
  }
};

const Index = (props: PropsTypes) =>  {
  return (
    <>
      <Metadata 
        title={props.recipes ? firstcaps(props.recipes.name) : "Unknown"} 
        description='Lets start cooking! Take a look at this recipe.'
      />
      <Recipe {...props} />
    </>
  )
}

export default Index