import { createAction, props } from '@ngrx/store';
import { Language } from '../models/settings.model';

export const actionSettingsChangeLanguage = createAction(
    '[Settings] Change Language',
    props<{ language: Language }>()
  );

export const actionSettingsChangeTheme = createAction(
    '[Settings] Change Theme',
    props<{ theme: string }>()
);

export const actionSettingsChangeAnimationsPage = createAction(
  '[Settings] Change Animations Page',
  props<{ pageAnimations: boolean }>()
);

export const actionSettingsChangeAnimationsElements = createAction(
  '[Settings] Change Animations Elements',
  props<{ elementsAnimations: boolean }>()
);
