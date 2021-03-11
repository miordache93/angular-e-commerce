import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SettingsState } from '../models/settings.model';
import { AppState } from '../state';


export const selectSettingsState = createFeatureSelector<
  AppState,
  SettingsState
>('settings');

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectTheme = createSelector(
  selectSettings,
  (settings: any) => settings.theme
);

export const selectSettingsLanguage = createSelector(
  selectSettings,
  (state: SettingsState) => state.language
);

export const selectPageAnimations = createSelector(
  selectSettings,
  (settings) => settings.pageAnimations
);

export const selectElementsAnimations = createSelector(
  selectSettings,
  (settings) => settings.elementsAnimations
);

