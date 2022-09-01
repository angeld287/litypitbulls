import { IBase } from "../../interfaces/models/IBase"
import { IRegisterUser } from "../../interfaces/models/IUser"

export interface IUserRegisterSlice extends IBase {
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    user: IRegisterUser;
    isRegistering: boolean;
    isRegistered: boolean;
}