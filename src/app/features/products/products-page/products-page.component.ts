import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/constants/route.animations';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  products$: Observable<any[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.products$ = this.apiService.getProducts();
  }

}
