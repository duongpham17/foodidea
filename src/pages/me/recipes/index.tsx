import Metadata from '@metadata';
import Recipes from 'routes/private/recipes';

export default function Index() {
  return (
    <>
      <Metadata 
        title="My Recipes" 
        description='my recipes dashboard'
      />
      <Recipes />
    </>
  )
}