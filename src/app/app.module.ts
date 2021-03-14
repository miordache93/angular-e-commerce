import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { TestingComponentComponent } from './testing-component/testing-component.component';
import { FooterComponent } from './shared/components/footer/footer.component';

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

// Custom imports
import { DashboardComponent } from './features/dashboard/dashboard.component';

// NgRx Store
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store/state';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './store/effects/settings.effects';
import { SecondDashboardComponent } from './features/second-dashboard/second-dashboard.component';
import { ThirdDashboardComponent } from './features/third-dashboard/third-dashboard.component';
import { FourthDashboardComponent } from './features/fourth-dashboard/fourth-dashboard.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MainMenuComponent } from './shared/main-menu/main-menu.component';


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
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
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
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      SettingsEffects
    ])
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
