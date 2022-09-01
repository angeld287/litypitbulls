import { configureStore } from "@reduxjs/toolkit";
import userSessionReducer from '../../features/userSession/userSessionSlice';
import userRegisterReducer from '../../features/userRegister/userRegisterSlice';

export const store = configureStore({
    reducer: {
        userSession: userSessionReducer,
        userRegister: userRegisterReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});