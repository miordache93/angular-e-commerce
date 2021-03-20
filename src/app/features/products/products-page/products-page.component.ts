import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/constants/route.animations';
import { Observable, fromEvent } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { data } from '../../../shared/constants/products';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { selectFilteredProducts, selectProductsFilters, isLoading, selectProductItems } from 'src/app/store/selectors/products.selectors';
import { actionGetProducts, actionProductsFilters } from 'src/app/store/actions/products.actions';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  products: any;
  filters$: any;
  searchText: string;
  isLoading = false;
  error = false;
  @ViewChild('searchProductsInput', { static: true }) searchProductsInput: ElementRef;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(actionGetProducts());
    fromEvent(this.searchProductsInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe((text: string) => {
        this.searchText = text;
        this.store.dispatch(actionProductsFilters({
          filters: {
            searchText: text,
            page: null,
            category: '',
            price: null,
          }
        }));
      });

    this.store.select(isLoading).subscribe(res => {
      this.isLoading = res;
    });
    this.filters$ = this.store.select(selectProductsFilters);
    this.store.select(selectFilteredProducts).subscribe(res => {
      this.products = res;
    });
  }

  filterByPrice(): void {
    this.store.dispatch(actionProductsFilters({
      filters: {
        searchText: this.searchText,
        page: null,
        category: '',
        price: {
          min: 10,
          max: 20
        },
      }
    }));
  }
}
