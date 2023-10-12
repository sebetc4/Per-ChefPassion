export enum Path {
    HOME = '/',
    ADMIN = '/admin',
    ADMIN_RECIPES = '/admin/recipes',
    ADMIN_RECIPES_LIST = '/admin/recipes/list',
    ADMIN_RECIPES_CREATE = '/admin/recipes/create',
    ADMIN_RECIPES_EDIT = '/admin/recipes/edit',
    ADMIN_USERS = '/admin/users', 
    SIGNUP = '/signup',
    SIGNIN = '/signin',
}

export type User = {
    _id: string;
    email: string;
    username: string;
}