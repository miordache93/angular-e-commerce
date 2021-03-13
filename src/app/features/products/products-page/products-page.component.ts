import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/constants/route.animations';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { data } from '../../../shared/constants/products';
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  products$: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.products$ = data.products.products.data.items;
  }

}
