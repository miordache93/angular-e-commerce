import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    constructor(private http: HttpClient) { }

    getProducts(): Observable<any> {
        return this.http.get('http://localhost:3000/products').pipe(
            map((res: any) => res.products.data.items)
        );
    }

}