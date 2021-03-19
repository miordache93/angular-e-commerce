import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, tap, debounce } from 'rxjs/operators';



import { ProductsService } from 'src/app/features/products/services/products.service';
import { actionGetProducts, actionGetProductsSuccess, actionGetProductsError } from '../actions/products.actions';


@Injectable()
export class ProductsEffects {
  getProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetProducts),
      switchMap((action) =>
        this.service.getProducts().pipe(
          map((items) => actionGetProductsSuccess({ items })),
          catchError((error) => of(actionGetProductsError({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private service: ProductsService
  ) {}
}
