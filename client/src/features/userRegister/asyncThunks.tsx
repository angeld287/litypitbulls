import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../apis/userService";
import IUserService from "../../interfaces/IUserService";
import { IRegisterUser } from "../../interfaces/models/IUser";

const userService: IUserService = new UserService();

export const registerAsync = createAsyncThunk(
    'userRegister/register',
    async (args: IRegisterUser) => {
        return await userService.register(args);
    }
);