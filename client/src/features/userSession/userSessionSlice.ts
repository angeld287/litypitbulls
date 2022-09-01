import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { loginAsync, logoutAsync, getSessionAsync } from './asyncThunks';
import { IUserSlice } from './IUserSession';

export const initialState: IUserSlice = {
  user: {
    id: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordResetToken: "",
    passwordResetExpires: new Date(),

    fullname: "",
    gender: "",
    userName: "",
  },
  getSessionStatus: 'idle',
  loginStatus: 'idle',
  logoutStatus: 'idle',
  error: undefined,
  message: "",
  activeSession: false
};

export const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,

  //Actions
  reducers: {
    setSession: (state, action: PayloadAction<boolean>) => {
      state.activeSession = action.payload;
    },
  },

  //async operations
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loginStatus = 'pending';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        let data = action.payload.data;

        if (data.session) {
          state.user = data.session;
          state.error = initialState.error;
          state.activeSession = true;
        } else {
          state.activeSession = false;
          state.user = initialState.user
          state.error = data.errors ? data.errors : data
        }
        state.loginStatus = 'idle';

      })
      .addCase(loginAsync.rejected, (state) => {
        state.loginStatus = 'failed';
      })
      .addCase(logoutAsync.pending, (state) => {
        state.logoutStatus = 'pending';
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.logoutStatus = 'idle';
        state.user = initialState.user;
        state.activeSession = false;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.logoutStatus = 'failed';
      })
      .addCase(getSessionAsync.pending, (state) => {
        state.getSessionStatus = 'pending';
      })
      .addCase(getSessionAsync.fulfilled, (state, action) => {
        state.getSessionStatus = 'idle';
        state.user = action.payload.data.session !== null ? action.payload.data.session.passport.user.user : initialState;
      })
      .addCase(getSessionAsync.rejected, (state) => {
        state.getSessionStatus = 'failed';
      });
  },
});

//Actions
export const { setSession } = userSessionSlice.actions;

export const selectUserSession = (state: RootState) => state.userSession;

export default userSessionSlice.reducer;
