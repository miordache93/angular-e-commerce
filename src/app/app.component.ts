import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatToolbar } from '@angular/material/toolbar';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTheme, selectSettingsLanguage } from './store/selectors/settings.selectors';
import { actionSettingsChangeTheme, actionSettingsChangeLanguage } from './store/actions/settings.actions';
import { routeAnimations } from './shared/constants/route.animations';
import { Router, NavigationEnd } from '@angular/router';
import { MENU_ITEMS } from './shared/constants/menu-items';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LANGUAGES } from './shared/constants/languages';
import { authLogin, authLogout } from './store/actions';
import { selectAuth, selectIsAuthenticated } from './store/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Angular E-Commerce';
  theme$: Observable<string>;
  language: string;
  menuItems = MENU_ITEMS;
  languages = LANGUAGES;
  isAuthenticated: boolean;

  @ViewChild(MatSidenavContainer, { static: true }) sidenavContainer: MatSidenavContainer;
  @ViewChild(CdkScrollable, { static: true }) scrollable: CdkScrollable;
  @ViewChild(MatSidenavContent, { static: true }) content: MatSidenavContent;
  @ViewChild('toolBara', { static: true }) toolbar: MatToolbar;

  constructor(private translateService: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private store: Store<any>) {
    translateService.setDefaultLang('en');
    this.languages.forEach(lang => {
      this.matIconRegistry.addSvgIcon(
        lang.flag,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${lang.flag}.svg`)
      );
    });
  }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectTheme));
    this.store.pipe(select(selectSettingsLanguage)).subscribe(lang => {
      this.translateService.use(lang);
      this.language = lang;
    });

    this.store.select(selectIsAuthenticated).subscribe(res => {
      this.isAuthenticated = res;
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit(): void {
    this.scrollable.elementScrolled().subscribe((event) => {
      const scrollTop = this.sidenavContainer.scrollable.getElementRef().nativeElement.scrollTop;
      if (scrollTop > 0) {
        this.toolbar._elementRef.nativeElement.classList.add('sticky');
        this.toolbar._elementRef.nativeElement.classList.remove('fixed');
      } else {
        this.toolbar._elementRef.nativeElement.classList.add('fixed');
        this.toolbar._elementRef.nativeElement.classList.remove('sticky');
      }
    });
  }

  navigateHome(): void {
    this.router.navigate(['/']);
    this.sidenavContainer.close();
  }

  changeLanguage(language): void {
    this.store.dispatch(actionSettingsChangeLanguage({
      language
    }));
    this.sidenavContainer.close();
  }

  changeTheme(theme): void {
    this.store.dispatch(actionSettingsChangeTheme({
      theme
    }));
    this.sidenavContainer.close();
  }

  onActivate(event): void {
    window.scroll(0, 0);
  }

  onLoginClick(): void {
    this.store.dispatch(authLogin());
  }

  onLogoutClick(): void {
    this.store.dispatch(authLogout());
  }
}
