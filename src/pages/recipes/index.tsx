import Metadata from '@metadata';
import Profile from 'routes/private/profile';

const RecipesIndex = () =>  {
  return (
    <>
      <Metadata 
        title="Recipe" 
        description='Lets start cooking! Take a look at this recipe.'
      />
      <Profile />
    </>
  )
}

export default RecipesIndex