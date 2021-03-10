import { SettingsState } from './models/settings.model';
import { settingsReducer } from './reducers/settings.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { initStateFromLocalStorage } from './reducers/meta.reducers';

import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './models/router.model';
import { debug } from './reducers/debug.reducer';

import { environment } from '../../environments/environment';

export const reducers: ActionReducerMap<AppState> = {
    settings: settingsReducer,
    router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
    initStateFromLocalStorage
];

if (!environment.production) {
    if (!environment.test) {
      metaReducers.unshift(debug);
    }
  }

//   export const selectRouterState = createFeatureSelector<
//   AppState,
//   RouterReducerState<RouterStateUrl>
// >('router');

// export const selectAuthState = createFeatureSelector<AppState, AuthState>(
//     'auth'
//   );

export interface AppState {
    settings: SettingsState;
    router: RouterReducerState<RouterStateUrl>;
}

