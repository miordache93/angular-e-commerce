import { createReducer, on, Action } from '@ngrx/store';
import { ProductsState } from '../models/products.model';
import { actionGetProducts, actionGetProductsSuccess, actionGetProductsError, actionProductsFilters } from '../actions/products.actions';

export const defaultFilters = {
    searchText: '',
    page: null,
    category: '',
    price: {
        max: null,
        min: null
    }
};

export const initialState: ProductsState = {
    items: [],
    error: false,
    pending: false,
    filters: defaultFilters
};

const reducer = createReducer(
    initialState,
    on(actionGetProducts, (state) => ({
        ...state,
        items: [],
        pending: true,
        error: null
    })),
    on(actionGetProductsSuccess, (state, { items }) => ({
        ...state,
        items,
        pending: false,
        error: null
    })),
    on(actionGetProductsError, (state, { error }) => ({
        ...state,
        pending: false,
        items: [],
        error
    })),
    on(actionProductsFilters, (state, { filters }) => ({
        ...state,
        pending: true,
        filters
    }))
);
// tslint:disable-next-line:typedef
export function productsReducer(state: ProductsState, action: Action) {
    return reducer(state, action);
}
