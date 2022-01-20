import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/configureStore';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.auth || initialState;

export const selectUser = createSelector(
  [selectSlice],
  authState => authState.user,
);

export const selectAuthLoading = createSelector(
  [selectSlice],
  authState => authState.loading,
);

export const selectAuthToken = createSelector(
  [selectSlice],
  authState => authState.token,
);

export const selectAuthError = createSelector(
  [selectSlice],
  authState => authState.error,
);
export const selectForgotPasswordEmail = createSelector(
  [selectSlice],
  authState => authState.forgotPasswordEmail,
);
export const selectForgotPasswordOTP = createSelector(
  [selectSlice],
  authState => authState.forgotPasswordOTP,
);
export const selectPubbunUserId = createSelector(
  [selectSlice],
  authState => authState.pubbunUserId ?? '',
);
export const selectAuth = createSelector([selectSlice], state => state);
