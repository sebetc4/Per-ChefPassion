import { SignupBody } from '~/types';
import { Api } from './Api';

class UsersApi extends Api {
    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = '/api/users';
    }

    async signup(body: SignupBody) {
        return await this.post(this.baseUrl, body);
    }
}

export const usersApi = new UsersApi();
