import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType, EffectSources } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { ProductsService } from 'src/app/features/products/services/products.service';
import {
  actionGetProducts,
  actionGetProductsSuccess,
  actionGetProductsError,
  actionProductsFilters,
  actionGetProductByIdSuccess,
  actionGetProductById,
  actionGetProductByIdError
} from '../actions';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

export const PRODUCTS_KEY = 'PRODUCTS';


@Injectable()
export class ProductsEffects {

  constructor(private actions$: Actions,
              private router: Router,
              private localStorageService: LocalStorageService,
              private service: ProductsService,
              private effectSources: EffectSources) {
    this.effectSources.addEffects(this.getProducts);
    this.effectSources.addEffects(this.getProductById);
  }

  getProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetProducts, actionProductsFilters),
      tap((res: any) => {
        if (res.filters) {
          this.localStorageService.setItem('PRODUCTS_FILTERS', res.filters);
        }
       }),
      switchMap((action) =>
        this.service.getProducts().pipe(
          map((items) => actionGetProductsSuccess({ items })),
          catchError((error) => {
            return of(actionGetProductsError({ error }));
          })
        )
      )
    )
  );

  getProductById = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetProductById),
      switchMap((action) =>
        this.service.getProductById(action.productId).pipe(
          map((product) => actionGetProductByIdSuccess({ product })),
          catchError(error => {
            this.router.navigate(['/']);
            return of(actionGetProductByIdError({ error }));
          })
        )
      ),
    )
  );
}
