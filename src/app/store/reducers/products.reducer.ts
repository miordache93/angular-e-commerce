import { createReducer, on, Action } from '@ngrx/store';
import {
    actionGetProducts,
    actionGetProductsSuccess,
    actionGetProductsError,
    actionProductsFilters,
    actionGetProductById,
    actionGetProductByIdSuccess,
    actionGetProductByIdError
} from '../actions/products.actions';
import { ProductsState } from '../products.state';

export const defaultFilters = {
    searchText: '',
    page: null,
    category: '',
    price: {
        max: null,
        min: null
    }
};

export const initialProductsState: ProductsState = {
    items: [],
    error: false,
    pending: false,
    filters: window.localStorage.getItem('ECommerce-PRODUCTS_FILTERS') ?
     JSON.parse(window.localStorage.getItem('ECommerce-PRODUCTS_FILTERS')) : defaultFilters,
    selectedItem: null
};

const reducer = createReducer(
    initialProductsState,
    on(actionGetProducts, (state: ProductsState) => {
        return {
            ...state,
            items: [],
            pending: true,
            error: null
        }
    }),
    on(actionGetProductsSuccess, (state, { items }) => {
        return {
            ...state,
            items,
            pending: false,
            error: null
        }
    }),
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
    })),
    on(actionGetProductById, (state: any) => ({
        ...state,
        selectedItem: null,
        pending: true
    })),
    on(actionGetProductByIdSuccess, (state: any, { product }) => ({
        ...state,
        selectedItem: { ...product },
        pending: false,
        error: null
    })),
    on(actionGetProductByIdError, (state: any, { error }) => {
        return {
            ...state,
            selectedItem: null,
            pending: false,
            error
        }
    }),
);
// tslint:disable-next-line:typedef
export function productsReducer(state: ProductsState, action: Action) {
    return reducer(state, action);
}
