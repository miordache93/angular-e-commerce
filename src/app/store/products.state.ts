import { ProductsFilters, Product } from './models';

export interface ProductsState {
    items: Product[];
    pending: boolean;
    error: boolean;
    filters: ProductsFilters;
    selectedItem: Product;
}

