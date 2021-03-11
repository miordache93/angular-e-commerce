import { Injectable } from '@angular/core';
import { actionSettingsChangeAnimationsElements, actionSettingsChangeAnimationsPage } from '../actions/settings.actions';
import { merge, combineLatest, of } from 'rxjs';
import { AnimationsService } from 'src/app/shared/services/animations.service';
import { selectPageAnimations, selectElementsAnimations } from '../selectors/settings.selectors';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';


import {
    tap,
    withLatestFrom,
    distinctUntilChanged,
    filter
} from 'rxjs/operators';
import { State } from '../models/settings.model';

const INIT = of('anms-init-effect-trigger');


@Injectable()
export class SettingsEffects {

    constructor(private animationsService: AnimationsService,
        private actions$: Actions,
        private store: Store<State>) { }
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

