import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/constants/route.animations';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { data } from '../../../shared/constants/products';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { selectProducts } from 'src/app/store/selectors/products.selectors';
import { actionGetProducts } from 'src/app/store/actions/products.actions';
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  products: any;
  isLoading = false;
  error = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.products$ = data.products.products.data.items.map((prod: any) => {
    //   prod.imageUrl = '../assets/product-image.jpg';
    //   return prod;
    // });
    this.store.dispatch(actionGetProducts());
    this.store.select(selectProducts).subscribe(res => {
      this.products = res.items;
      this.isLoading = res.pending;
      this.error = res.error;
    });
  }

}
