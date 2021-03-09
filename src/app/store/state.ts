import { SettingsState } from './models/settings.model';
import { settingsReducer } from './reducers/settings.reducers';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { initStateFromLocalStorage } from './reducers/meta.reducers';

export interface AppState {
    settings: SettingsState;
}

export const reducers: ActionReducerMap<AppState> = {
    settings: settingsReducer
}

export const metaReducers: MetaReducer<AppState>[] = [
    initStateFromLocalStorage
];

