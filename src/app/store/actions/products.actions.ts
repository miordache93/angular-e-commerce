import { createAction, props } from '@ngrx/store';
import { ProductsFilters, Product } from './../models/products.model';

export const actionProductsFilters = createAction(
    '[Products] Filters',
    props<{ filters: ProductsFilters }>()
);

export const actionGetProducts = createAction(
    '[Products] Get Products',
);
export const actionGetProductsSuccess = createAction(
    '[Products] Get Products Success',
    props<{ items: Product[] }>()
);
export const actionGetProductsError = createAction(
    '[Products] Get Products Error',
    props<{ error: boolean }>()
);
