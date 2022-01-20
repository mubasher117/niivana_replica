import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { AuthState } from './types';

export const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  token: '',
  forgotPasswordEmail: '',
  forgotPasswordOTP: -1,
  pubbunUserId: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(
      state,
      action: PayloadAction<{
        username: string;
        password: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.token = '';
    },
    registerRequest(
      state,
      action: PayloadAction<{
        name: string;
        password: string;
        email: string;
        confirmPassword: string;
        age: string;
        location: string;
        refferalCode: string;
        last_name: string;
        first_name: string;
        phone: string;
        group: string;
        hear_about_us: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.token = '';
    },
    registerSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    registerError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.token = '';
    },

    forgotPasswordRequest(
      state,
      action: PayloadAction<{
        email: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    forgotPasswordSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    forgotPasswordError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },

    checkOTPRequest(
      state,
      action: PayloadAction<{
        code: string;
        email?: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    checkOTPSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    checkOTPError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest(
      state,
      action: PayloadAction<{
        email: string;
        code: number;
        password: string;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    resetPasswordError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    setForgotPasswordEmail(state, action: PayloadAction<string>) {
      state.forgotPasswordEmail = action.payload;
    },
    setForgotPasswordOTP(state, action: PayloadAction<number>) {
      state.forgotPasswordOTP = action.payload;
    },
    logout(state) {
      state.token = '';
      state.user = null;
      state.loading = false;
      state.forgotPasswordEmail = '';
      state.forgotPasswordOTP = -1;
      state.error = null;
    },
    setPubbunUserId(state, action: PayloadAction<string>) {
      state.pubbunUserId = action.payload;
    },
    reset: () => initialState,
  },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
  return { actions: slice.actions };
};
export const authReducer = slice.reducer;

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
