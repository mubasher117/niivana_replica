import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { getThemeFromStorage } from '../utils';
import { ThemeKeyType, ThemeState } from './types';

export const initialState: ThemeState = {
  selected: getThemeFromStorage() || 'system',
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeKeyType>) {
      state.selected = action.payload;
    },
  },
});

export const { actions: themeActions, reducer } = slice;

export const useThemeSlice = () => {
  return { actions: slice.actions };
};
export const themeReducer = slice.reducer;
