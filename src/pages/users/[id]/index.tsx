import Metadata from '@metadata';
import Users from 'routes/public/users/[id]';
import { api } from '@database/api';
import { IRecipesResponse } from '@database/models/recipes';
import { IUsersResponse } from '@database/models/users';

export interface PropsTypes {
  recipes: IRecipesResponse[],
  user: IUsersResponse,
};

export const getServerSideProps = async (context: any) => {
  try{
    const response = await api.get(`/recipes/users/${context.query.id}`);

    return{
      props:{
        recipes: response.data.data.recipes || null,
        user: response.data.data.user || null,
      }
    }
  } catch(err){
    return{
      props:{
        recipes: null,
        user: null
      }
    }
  }
};

const Index = (props: PropsTypes) =>  {
  return (
    <>
      <Metadata 
        title={props.user.username}
        description='Lets start cooking! Take a look at this recipe.'
      />
      <Users {...props} />
    </>
  )
}

export default Index