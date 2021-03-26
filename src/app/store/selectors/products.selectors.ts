import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, selectRouterState } from '../state';
import { ProductsState, Product } from '../models/products.model';

export const selectProductsState = createFeatureSelector<
  AppState,
  ProductsState
>('products');

export const selectProductItems = createSelector(
  selectProductsState,
  (state: ProductsState) => state.items
);

export const selectProductsFilters = createSelector(
  selectProductsState,
  (state) => state.filters
);



export const selectFilteredProducts = createSelector(
  selectProductItems,
  selectProductsFilters,
  (items, filters) => {
    return filterProducts(items, filters);
  }
);

export const selectSelectedProduct = createSelector(
  selectProductItems,
  selectRouterState,
  (items, params: any) => {
    console.log('selector', params);
    return params && items.find(item => item.id === params.state.root.firstChild.params.id);
  }
);


export const isLoading = createSelector(
  selectProductsState,
  state => !!state.pending
);

const filterProducts = (items, filters) => {
  for (const prop in filters) {
     if (filters[prop] && FILTERS_MAP[prop]) {
        items = FILTERS_MAP[prop](items, filters[prop]);
     }
  }
  return items;
};

const FILTERS_MAP = {
  searchText: (items, searchText) => {
     return items.filter(item => item.name.indexOf(searchText) > -1);
  }
};




