import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/store/models';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectSelectedProduct } from 'src/app/store/selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct: Product;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(selectSelectedProduct)).subscribe(res => {
     this.selectedProduct = res;
    });
  }

}
