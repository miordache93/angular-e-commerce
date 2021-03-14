import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent,
         SecondDashboardComponent,
         ThirdDashboardComponent,
         FourthDashboardComponent } from './features/';

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
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
