import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';


@Injectable()
export class ProductsDetailsGuardService implements CanActivate {
    constructor(private router: Router, private store: Store) { }

    canActivate(): boolean {
        return true;
    }
}
