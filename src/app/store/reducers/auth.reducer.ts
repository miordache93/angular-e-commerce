import { createReducer, on, Action } from '@ngrx/store';
import { AuthState } from '../models/auth.model';
import { authLogin, authLogout } from '../actions/';

export const initialAuthState: AuthState = {
  isAuthenticated: false
};

const reducer = createReducer(
    initialAuthState,
  on(authLogin, (state) => ({ ...state, isAuthenticated: true })),
  on(authLogout, (state) => ({ ...state, isAuthenticated: false }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
