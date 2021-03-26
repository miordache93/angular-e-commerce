import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DashboardComponent,
  SecondDashboardComponent,
  ThirdDashboardComponent,
  FourthDashboardComponent,
  SettingsComponent
} from './features/';
import { TestComponent } from './features/test/test.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'second-dashboard',
    component: SecondDashboardComponent
  },
  {
    path: 'third-dashboard',
    component: ThirdDashboardComponent
  },
  {
    path: 'fourth-dashboard',
    component: FourthDashboardComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'authenticate',
    component: TestComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
