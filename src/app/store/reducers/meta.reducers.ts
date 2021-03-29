import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../../shared/services/local-storage.service';
import { AppState } from './../state';

export function initStateFromLocalStorage(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  // tslint:disable-next-line:only-arrow-functions
  return function(state, action): any {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}