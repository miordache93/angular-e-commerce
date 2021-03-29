// ngrx store
import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

// custom imports
import { environment } from '../../environments/environment';
import {
  authReducer,
  debug,
  initStateFromLocalStorage,
  settingsReducer
} from './reducers/';
import {
  AuthState,
  SettingsState,
  RouterStateUrl
} from './models/';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer,
  router: routerReducer,
  auth: authReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export interface AppState {
  settings: SettingsState;
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
}

