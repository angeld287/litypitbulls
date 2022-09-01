import { IResponse } from "./models/IResponse";
import { IRegisterUser } from "./models/IUser";

export default interface IUserService {
    login(username: string, password: string): Promise<IResponse>;

    register(user: IRegisterUser): Promise<IResponse>;

    logout(): Promise<IResponse>;

    getSession(): Promise<IResponse>;
}