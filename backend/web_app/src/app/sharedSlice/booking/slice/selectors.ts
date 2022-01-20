import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/configureStore';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.booking || initialState;

export const selectBookingList = createSelector(
  [selectSlice],
  bookingState => bookingState.bookingList,
);

export const selectBookingLoading = createSelector(
  [selectSlice],
  bookingState => bookingState.loading,
);

export const selectBookingError = createSelector(
  [selectSlice],
  bookingState => bookingState.error,
);

export const selectBooking = createSelector([selectSlice], state => state);
