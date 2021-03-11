
export const NIGHT_MODE_THEME = 'BLACK-THEME';

export type Language = 'en' | 'ro' | 'fr' ;

export interface SettingsState {
  language: string;
  theme: string;
  elementsAnimations: boolean;
  pageAnimations: boolean;
}

export interface State {
  settings: SettingsState;
}
