import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Custom Components & Modules
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';
// Material Module
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
// Ngrx
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from 'src/app/store/effects';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './../../store/reducers/products.reducer';
// Services
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [ProductsPageComponent, ProductDetailsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects])
  ],
  exports: [
    ProductsPageComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
