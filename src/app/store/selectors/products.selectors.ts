import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductsState } from '../products.state';


export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectItems = createSelector(
  selectProductsState,
  (state: ProductsState) => state.items
);

export const selectItem = createSelector (
  selectProductsState,
  (state: ProductsState) => state.selectedItem);


export const selectLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => !!state.pending
);

export const selectError = createSelector(
  selectProductsState,
  (state: ProductsState) => !!state.error
);

export const selectFilters = createSelector(
  selectProductsState,
  (state: ProductsState) => state.filters
);

export const selectFilteredProducts = createSelector(
  selectItems,
  selectFilters,
  selectLoading,
  selectError,
  (items, filters, pending, error) => {
    return {
      items : filterProducts(items, filters),
      pending,
      error
    };
  }
);

export const selectProduct = createSelector(
  selectItem,
  selectLoading,
  selectError,
  (item, pending, error) => {
    return {
      item,
      pending,
      error
    };
  }
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
