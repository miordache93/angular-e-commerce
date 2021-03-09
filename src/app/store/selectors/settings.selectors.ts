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