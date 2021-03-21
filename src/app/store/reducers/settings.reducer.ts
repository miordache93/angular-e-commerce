import { createReducer, on, Action } from '@ngrx/store';
import { SettingsState } from '../models/settings.model';
import { actionSettingsChangeLanguage,
        actionSettingsChangeTheme,
        actionSettingsChangeAnimationsPage,
        actionSettingsChangeAnimationsElements
} from '../actions/';

export const initialSettinsState: SettingsState = {
    language: 'en',
    theme: 'default-theme',
    elementsAnimations: true,
    pageAnimations: true

};

const reducer = createReducer(
    initialSettinsState,
    on(
        actionSettingsChangeLanguage,
        actionSettingsChangeTheme,
        actionSettingsChangeAnimationsPage,
        actionSettingsChangeAnimationsElements,
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
