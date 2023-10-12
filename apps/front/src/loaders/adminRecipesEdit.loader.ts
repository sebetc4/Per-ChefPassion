import { recipesApi } from "~/services"

export const adminRecipesEditLoader = async (id: string) => {
    return await recipesApi.getRecipe(id as string)
}