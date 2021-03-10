import { createReducer, on, Action } from '@ngrx/store';
import { SettingsState } from '../models/settings.model';
import { actionSettingsChangeLanguage, actionSettingsChangeTheme } from '../actions/settings.actions';

export const initialState: SettingsState = {
    language: 'en',
    theme: 'default-theme'
};

const reducer = createReducer(
    initialState,
    on(
        actionSettingsChangeLanguage,
        actionSettingsChangeTheme,
        (state, action) => ({ ...state, ...action })
    )
);


// tslint:disable-next-line:typedef
export function settingsReducer(
    state: SettingsState | undefined,
    action: Action
) {
    return reducer(state, action);
}
