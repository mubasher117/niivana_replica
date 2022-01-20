import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { pubnubInternalSaga } from './saga';
import { PubnubInternalState } from './types';

export const initialState: PubnubInternalState = {
  loading: false,
  error: null,
  selectedConversationId: null,
  userList: {},
};
const slice = createSlice({
  name: 'pubnubInternal',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    setSelectedConversationId(state, action: PayloadAction<string | null>) {
      state.selectedConversationId = action.payload;
    },
    setUserList(
      state,
      action: PayloadAction<
        Partial<{
          custom: any;
          id: string;
          name: string;

          profileUrl: string;
          externalId: string;
          email: string;
          eTag: string;
        }>
      >,
    ) {
      const userId = action.payload.id;
      if (userId) {
        state.userList[userId] = action.payload;
      }
    },
    reset: () => initialState,
  },
});

export const { actions: pubnubInternalActions } = slice;

export const usePubnubInternalSlice = () => {
  return { actions: slice.actions };
};
export const pubnubInternalReducer = slice.reducer;

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = usePubnubInternalSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
