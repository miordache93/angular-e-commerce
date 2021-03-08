// product.reducer.ts
import { Action } from '@ngrx/store';


export const CHANGE_APP_SETTINGS = 'CHANGE_APP_SETTINGS';

export interface AppSettingsState {
    darkTheme: boolean;
    defaultLanguage: string;
    other?: [];
}

const initialState: AppSettingsState = {
 darkTheme: true,
 defaultLanguage: 'en'
};

export function appSettingsReducer(state: any = initialState, action): AppSettingsState {
  switch (action.type) {
    case CHANGE_APP_SETTINGS:
        return {...state, ...action.payload };
    default:
        return state;
    }
}


