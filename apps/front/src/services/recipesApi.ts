// Libs
import { CreateUpdateRecipeBody, Recipe } from 'types';
// App
import { Api } from './Api';

class RecipesApi extends Api {
    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = 'https://restapi.fr/api/recipes';
    }

    async getRecipe(id: string) {
        return await this.get<Promise<Recipe>>(`${this.baseUrl}/${id}`);
    }

    async getRecipes(page: number, limit: number) {
        const queryParams = new URLSearchParams({
            skip: `${(page - 1) * limit}`,
            limit: `${limit}`,
            sort: 'createdAt:-1',
        });
        return await this.get<Promise<Recipe[] | Recipe>>(`${this.baseUrl}?${queryParams}`);
    }

    async createRecipe(data: CreateUpdateRecipeBody) {
        return await this.post(`${this.baseUrl}`, data);
    }

    async updateRecipe(id: string, data: Partial<Omit<Recipe, '_id' | 'createdAt'>>) {
        return await this.patch(`${this.baseUrl}/${id}`, data);
    }

    async deleteRecipe(id: string) {
        return await this.delete(`${this.baseUrl}/${id}`);
    }
}

export const recipesApi = new RecipesApi();
