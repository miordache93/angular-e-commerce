import { Component, OnInit, Input } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/constants/route.animations';
import { Product } from 'src/app/store/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

}
