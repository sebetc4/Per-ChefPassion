export type CreateUserBody = {
    username: string,
    email: string,
    password: string,
}

export type SigninBody = {
    email: string,
    password: string,
}