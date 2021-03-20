import { Component, OnInit, Input } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/constants/route.animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor() { }

  ngOnInit(): void {
  }

}
