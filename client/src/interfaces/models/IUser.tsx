export interface IUser {
    id: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;

    fullname: string;
    gender: string;
    userName: string;
}

export interface IRegisterUser extends IUser {
    confirmPassword: string;
}