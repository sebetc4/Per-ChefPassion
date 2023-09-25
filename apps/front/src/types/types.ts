export type Recipe = {
    _id: string,
    title: string,
    image: string,
    liked: boolean,
    createdAt: string,
}

export type CreateRecipeBody = {
    title: string,
    image: string,
}

export type SignupBody = {
    username: string,
    email: string,
    password: string,
}

export enum Path {
    HOME = '/',
    ADMIN = '/admin',
    ADMIN_RECIPES = '/admin/recipes',
    ADMIN_RECIPES_LIST = '/admin/recipes/list',
    ADMIN_RECIPES_CREATE = '/admin/recipes/create',
    ADMIN_RECIPES_EDIT = '/admin/recipes/edit',
    ADMIN_USERS = '/admin/users', 
    BASKET = '/basket',
    SIGNUP = '/signup',
    SIGNIN = '/signin',
}