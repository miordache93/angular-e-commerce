import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/store/models/products.model';
import { HttpClient } from '@angular/common/http';
import { map, delay, tap, filter, catchError } from 'rxjs/operators';
import { data as DATA } from '../../../shared/constants/products';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        // for local testing
        if (environment.production) {
            return of(DATA).pipe(
                tap(res => {
                    console.log(res);
                }),
                map((res: any) => {
                    res.products.forEach(prod => {
                        prod.imageUrl = '../assets/product-image.jpg';
                    });
                    return res.products;
                }),
                delay(2500)
            );
        } else {
            return this.http.get<Product[]>('api/products').pipe(
                map((products: any) => {
                    products.forEach(prod => {
                        prod.imageUrl = '../assets/product-image.jpg';
                    });
                    return products;
                }),
                delay(3000)
            );
        }
    }

    getProductById(productId: string): Observable<Product> {
        if (environment.production) {
            return of(DATA).pipe(
                map((res: any) => {
                    res.products.forEach(prod => {
                        prod.imageUrl = '../assets/product-image.jpg';
                    });
                    return res.products.find(item => item.id === productId);
                }),
                delay(2500)
            );
        } else {
            return this.http.get<Product>(`api/products/${productId}`).pipe(
                delay(3000),
                map((res => {
                    res.imageUrl = '../assets/product-image.jpg';
                    return res;
                })
                ));
        }
    }
}
