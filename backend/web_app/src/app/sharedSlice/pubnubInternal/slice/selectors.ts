import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/configureStore';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.pubnubInternal || initialState;

export const selectPubnubInternal = createSelector(
  [selectSlice],
  state => state,
);
export const selectUserList = createSelector(
  [selectSlice],
  state => state.userList,
);

export const getCurrentConversationId = createSelector(
  [selectSlice],
  state => state.selectedConversationId,
);
