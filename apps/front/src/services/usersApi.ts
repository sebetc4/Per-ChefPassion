// Libs
import { SigninBody, CreateUserBody } from 'types';
// Api
import { Api } from './Api';

class UsersApi extends Api {
    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = '/api';
    }

    async createUser(body: CreateUserBody) {
        return await this.post(`${this.baseUrl}/users`, body);
    }

    async signin(body: SigninBody) {
        return await this.post(`${this.baseUrl}/auth`, body);
    }

    async getCurrentUser() {
        return await this.get(`${this.baseUrl}/auth`);
    }

    async signout() {
        return await this.delete(`${this.baseUrl}/auth`);
    }
}

export const usersApi = new UsersApi();
