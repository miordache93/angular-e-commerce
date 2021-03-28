import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/store/models';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { actionGetProductById } from 'src/app/store/actions';
import { selectProduct } from 'src/app/store/selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  selectedProduct: Product;
  paramsSubscription$: Subscription;
  selectedProductSubscription$: Subscription;
  prodId: string;
  isLoading: boolean;
  error = false;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSubscription$ = this.route.params.subscribe((params: any) => {
      this.prodId = params.id;
    });
    this.store.dispatch(actionGetProductById({productId: this.prodId }));
    this.store.select(selectProduct).subscribe(({ item, pending, error }) => {
      this.selectedProduct = item;
      this.isLoading = pending;
      this.error = error;
    });
  }

  ngOnDestroy(): void { }
}
