export interface Product {
    id: string;
    name: string;
    description: string;
    features: string;
    price: string;
    keywords: string;
    url: string;
    category: string;
    subcategory: string;
    imageUrl?: string;
}


export interface ProductsFilters {
    searchText?: string;
    page?: number;
    category?: string;
    price?: {
        max?: number,
        min?: number
    };
}

export interface ProductsState {
    items: Product[];
    pending: boolean;
    error: boolean;
    filters: ProductsFilters;
}


