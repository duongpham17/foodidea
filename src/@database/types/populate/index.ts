import { IUsersResponse } from '@database/models/users';
import { IRecipesResponse } from '@database/models/recipes';

export interface IRecipes_IUsers extends Omit<IRecipesResponse, 'user'> {
    user: IUsersResponse;
}