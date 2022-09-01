import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { registerAsync } from './asyncThunks';
import { IUserRegisterSlice } from './IUserRegister';

export const initialState: IUserRegisterSlice = {
  user: {
    id: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    gender: "",
    userName: "",
  },
  status: 'idle',
  isRegistering: false,
  isRegistered: false,
};

export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,

  //Actions
  reducers: {
    setIsRegistering: (state, action: PayloadAction<boolean>) => {
      state.isRegistering = action.payload;
    },
  },

  //async operations
  extraReducers: (builder) => {

    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        let data = action.payload.data;

        if (data.userId) {
          state.error = initialState.error;
          state.message = data.message;
          state.isRegistered = true;
        } else {
          state.isRegistered = false;
          state.isRegistering = true;
          state.error = data.errors ? data.errors : data
        }

        state.status = 'idle';
      })
      .addCase(registerAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

//Actions
export const { setIsRegistering } = userRegisterSlice.actions;

export const selectUserRegister = (state: RootState) => state.userRegister;

export default userRegisterSlice.reducer;
