import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [ProductsPageComponent, ProductDetailsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
