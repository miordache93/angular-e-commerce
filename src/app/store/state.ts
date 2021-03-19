import { SettingsState } from './models/settings.model';
import { settingsReducer } from './reducers/settings.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { initStateFromLocalStorage } from './reducers/meta.reducers';

import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './models/router.model';
import { debug } from './reducers/debug.reducer';

import { environment } from '../../environments/environment';
import { productsReducer } from './reducers/products.reducer';
import { ProductsState } from './models/products.model';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer,
  products: productsReducer,
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

// export const selectAuthState = createFeatureSelector<AppState, AuthState>(
//     'auth'
//   );

export interface AppState {
  settings: SettingsState;
  products: ProductsState;
  router: RouterReducerState<RouterStateUrl>;
}

