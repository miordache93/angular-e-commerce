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


export const actionGetProductById = createAction(
    '[Products] Get Product By Id',
    props<{ productId: string }>()
);

export const actionGetProductByIdSuccess = createAction(
    '[Products] Get Product By Id Success',
    props<{ product: Product }>()
);

export const actionGetProductByIdError = createAction(
    '[Products] Get Product By Id Error',
    props<{ error: boolean }>()
);
