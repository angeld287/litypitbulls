import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../apis/userService";
import IUserService from "../../interfaces/IUserService";
import { ICredentials } from "./IUserSession";

const userService: IUserService = new UserService();

export const loginAsync = createAsyncThunk(
    'userSession/login',
    async (args: ICredentials) => {
        return await userService.login(args.username, args.password);
    }
);

export const logoutAsync = createAsyncThunk(
    'userSession/logout',
    async () => {
        return await userService.logout();
    }
);

export const getSessionAsync = createAsyncThunk(
    'userSession/getsession',
    async () => {
        return await userService.getSession();
    }
);