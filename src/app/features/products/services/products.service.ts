import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/store/models/products.model';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';


@Injectable()
export class ProductsService {
    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('api/products').pipe(
            map((res: any) => res.products.data.items),
            delay(3000)
        );
    }
}
