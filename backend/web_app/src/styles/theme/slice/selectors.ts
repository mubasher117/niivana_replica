import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/configureStore';

import { initialState } from '.';
import { themes } from '../themes';
import { isSystemDark } from '../utils';

export const selectTheme = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => {
    return themes.light;
  },
);

export const selectThemeKey = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => theme.selected,
);
