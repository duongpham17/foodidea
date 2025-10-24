import { metadata } from '@metadata';
import RecipesId from 'routes/public/recipes/[id]';
import { api } from '@database/api';
import { IRecipesApi } from '@database/models/recipes'; 

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Await params before accessing id
    const res = await api.get(`/public/recipes/${id}`);
    const recipe: IRecipesApi = res.data.data.recipes;

    return metadata({
      title: `${recipe.name}`,
      description: `Recipe in ${recipe.duration} minutes, ${recipe.views} views, ingredients ${recipe.ingredients}`,
    });
  } catch (error) {
    return metadata({
      title: `Recipe Not Found`,
      description: `Could not load recipe metadata.`,
    });
  }
};

const RecipesIdPage = async () => {
  return (
    <main>
      <RecipesId />
    </main>
  );
};

export default RecipesIdPage