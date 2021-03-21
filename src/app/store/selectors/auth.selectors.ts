import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../state';
import { AuthState } from './../models';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
