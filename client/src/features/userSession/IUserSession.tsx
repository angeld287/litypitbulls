import { IBase } from "../../interfaces/models/IBase"
import { IUser } from "../../interfaces/models/IUser"

export interface ICredentials {
    username: string;
    password: string;
}

export interface IUserSlice extends IBase {
    loginStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
    logoutStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
    getSessionStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
    user: IUser;
    activeSession: boolean;
}