import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/constants/route.animations';
import { fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFilteredProducts, selectFilters } from 'src/app/store/selectors/products.selectors';
import { actionGetProducts, actionProductsFilters } from 'src/app/store/actions/products.actions';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductsState } from 'src/app/store/products.state';
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


  constructor(private store: Store<ProductsState>) { }

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
    this.store.select(selectFilters).subscribe(res => {
      this.searchText = res.searchText;
      this.filters$ = res;
    });
    this.store.select(selectFilteredProducts).subscribe((res: ProductsState) => {
      this.products = res.items;
      this.isLoading = res.pending;
      this.error = res.error;
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
