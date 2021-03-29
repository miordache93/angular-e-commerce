import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { merge, combineLatest, of } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { actionSettingsChangeAnimationsElements,
        actionSettingsChangeAnimationsPage,
        actionSettingsChangeTheme,
        actionSettingsChangeLanguage
} from '../actions/';
import { selectPageAnimations,
        selectElementsAnimations,
        selectSettingsState
} from '../selectors/';
import { State } from '../models/';

import { AnimationsService } from 'src/app/shared/services/animations.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

const INIT = of('init-effect-trigger');

export const SETTINGS_KEY = 'SETTINGS';

@Injectable()
export class SettingsEffects {

    constructor(private animationsService: AnimationsService,
                private localStorageService: LocalStorageService,
                private actions$: Actions,
                private store: Store<State>) { }

        persistSettings = createEffect(
            () =>
              this.actions$.pipe(
                ofType(
                  actionSettingsChangeAnimationsElements,
                  actionSettingsChangeAnimationsPage,
                  actionSettingsChangeLanguage,
                  actionSettingsChangeTheme
                ),
                withLatestFrom(this.store.pipe(select(selectSettingsState))),
                tap(([action, settings]) =>
                  this.localStorageService.setItem(SETTINGS_KEY, settings)
                )
              ),
            { dispatch: false }
          );

    updateRouteAnimationType = createEffect(
        () =>
            merge(
                INIT,
                this.actions$.pipe(
                    ofType(
                        actionSettingsChangeAnimationsElements,
                        actionSettingsChangeAnimationsPage
                    )
                )
            ).pipe(
                withLatestFrom(
                    combineLatest([
                        this.store.pipe(select(selectPageAnimations)),
                        this.store.pipe(select(selectElementsAnimations))
                    ])
                ),
                tap(([action, [pageAnimations, elementsAnimations]]) =>
                    this.animationsService.updateRouteAnimationType(
                        pageAnimations,
                        elementsAnimations
                    )
                )
            ),
        { dispatch: false }
    );
}

