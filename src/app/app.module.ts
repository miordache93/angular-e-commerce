import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Layout imports
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// Custom imports
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SecondDashboardComponent } from './features/second-dashboard/second-dashboard.component';
import { ThirdDashboardComponent } from './features/third-dashboard/third-dashboard.component';
import { FourthDashboardComponent } from './features/fourth-dashboard/fourth-dashboard.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MainMenuComponent } from './shared/main-menu/main-menu.component';
import { SettingsComponent } from './features/settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestingComponentComponent } from './testing-component/testing-component.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// NgRx Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
// --
import { metaReducers, reducers } from './store/state';
import { SettingsEffects } from './store/effects/settings.effects';
import { ProductsModule } from './features/products/products.module';
import { ProductsEffects } from './store/effects/products.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// env
import { environment } from 'src/environments/environment';
import { TestComponent } from './features/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    TestingComponentComponent,
    FooterComponent,
    DashboardComponent,
    SecondDashboardComponent,
    ThirdDashboardComponent,
    FourthDashboardComponent,
    MenuComponent,
    MainMenuComponent,
    SettingsComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    ProductsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    environment.production
    ? []
    : StoreDevtoolsModule.instrument({
        name: 'Angular E-Commerce Platform'
      }),
    EffectsModule.forRoot([
      SettingsEffects
    ]),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

// required for AOT compilation
// tslint:disable-next-line:typedef
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
