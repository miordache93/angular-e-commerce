import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state';
import { ProductsState } from '../models/products.model';

export const selectSettingsState = createFeatureSelector<
  AppState,
  ProductsState
>('products');

export const selectProducts = createSelector(
  selectSettingsState,
  (state: ProductsState) => state
);
