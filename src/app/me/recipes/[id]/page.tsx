import RecipesId from 'routes/private/me/recipes/[id]';
import {metadata} from '@metadata';

export function generateMetadata() {
  return metadata({
    title: "My recipe editing",
    description:"Editing my recipes for the masses"
  });
};

const RecipesPage = () => {
  return (
    <main>
      <RecipesId />
    </main>
  )
}

export default RecipesPage