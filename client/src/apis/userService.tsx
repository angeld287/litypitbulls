import IUserService from "../interfaces/IUserService";
import { IResponse, ResponseStatus, StatusCode } from "../interfaces/models/IResponse";
import { IRegisterUser } from "../interfaces/models/IUser";
import { fetcher } from "../utils/fetch-utils";
import Locals from "../utils/locals";

class userService implements IUserService {

    private url: string = Locals.config().server_url;

    async login(username: string, password: string): Promise<IResponse> {
        try {
            const userFetch = await fetcher(this.url + '/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            return await userFetch;
        } catch (error) {
            console.log('error', error);

            return new Promise<IResponse>(() => ({
                status: ResponseStatus.INTERNAL_ERROR,
                message: 'Internal Application Error',
                statusCode: StatusCode.FAILURE,
                data: error
            })
            );
        }
    }

    async register(user: IRegisterUser): Promise<IResponse> {
        try {
            const userFetch = await fetcher(this.url + '/api/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            return await userFetch;
        } catch (error) {
            console.log('error', error);

            return new Promise<IResponse>(() => ({
                status: ResponseStatus.INTERNAL_ERROR,
                message: 'Internal Application Error',
                statusCode: StatusCode.FAILURE,
                data: error
            })
            );
        }
    }

    async logout(): Promise<IResponse> {
        const logoutFetch = await fetcher(this.url + '/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return await logoutFetch;
    }

    async getSession(): Promise<IResponse> {
        const sessionFetch = await fetcher(this.url + '/api/auth/getsession', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return await sessionFetch;
    }
}

export default userService