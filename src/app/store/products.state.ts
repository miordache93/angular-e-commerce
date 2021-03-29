import { ProductsFilters, Product } from './models';
import { initStateFromLocalStorage } from './reducers';
import { MetaReducer, UPDATE, INIT, ActionReducer } from '@ngrx/store';
import { LocalStorageService } from '../shared/services/local-storage.service';

export interface ProductsState {
    items: Product[];
    pending: boolean;
    error: boolean;
    filters: ProductsFilters;
    selectedItem: Product;
}

