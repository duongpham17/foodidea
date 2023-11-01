import Metadata from '@metadata';
import Recipes from 'routes/private/recipes/[id]';

export default function Index() {
  return (
    <>
      <Metadata 
        title="Recipe Edit" 
        description='my recipe'
      />
      <Recipes />
    </>
  )
}