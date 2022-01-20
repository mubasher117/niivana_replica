import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { BookingState } from './types';

export const initialState: BookingState = {
  loading: false,
  error: null,
  bookingList: null,
};

const slice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    bookingListRequest(state) {
      state.loading = true;
      state.error = null;
      state.bookingList = null;
    },
    bookingListSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.bookingList = action.payload;
    },
    bookingListError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
      state.bookingList = null;
    },
    reset: () => initialState,
  },
});

export const { actions: bookingActions } = slice;

export const useBookingSlice = () => {
  return { actions: slice.actions };
};

export const bookingReducer = slice.reducer;
