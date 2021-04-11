import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatToolbar } from '@angular/material/toolbar';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { selectTheme, selectSettingsLanguage } from './store/selectors/settings.selectors';
import { actionSettingsChangeTheme, actionSettingsChangeLanguage } from './store/actions/settings.actions';
import { routeAnimations } from './shared/constants/route.animations';
import { Router, NavigationEnd } from '@angular/router';
import { MENU_ITEMS } from './shared/constants/menu-items';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LANGUAGES } from './shared/constants/languages';
import { authLogin, authLogout } from './store/actions';
import { selectIsAuthenticated } from './store/selectors/auth.selectors';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  menuItemsMap = {
    login: this.onLoginClick.bind(this),
    test: this.onHomeClick.bind(this),
    search: this.onSearchClick.bind(this)
  };
  mobileView = false;
  enableBack = false;

  @ViewChild(MatSidenavContainer, { static: true }) sidenavContainer: MatSidenavContainer;
  @ViewChild(CdkScrollable, { static: true }) scrollable: CdkScrollable;
  @ViewChild(MatSidenavContent, { static: true }) content: MatSidenavContent;
  @ViewChild('toolBara', { static: true }) toolbar: MatToolbar;
  @ViewChild('sidenav', { static: true }) sidenav: any;

  constructor(private translateService: TranslateService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private location: Location,
              private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog,
              private router: Router,
              private store: Store<any>) {
    translateService.setDefaultLang('en');
    this.languages.forEach(lang => {
      this.matIconRegistry.addSvgIcon(
        lang.flag,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${lang.flag}.svg`)
      );
    });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const routesCanGoBack = ['/cart', '/products/']; // change logic asap
        if (val.url.includes(routesCanGoBack[0]) ||
        val.url.includes(routesCanGoBack[1])) {
          this.enableBack = true;
        } else {
          this.enableBack = false;
        }
      }
    });

    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      if (result.matches) {
        this.mobileView = true;
      } else {
        this.mobileView = false;
      }
      this.traverseMenuItems(this.setupHiddenProp.bind(this));
    });
  }

  ngOnInit(): void {
    this.traverseMenuItems(this.setupOnClickEvents.bind(this));
    this.theme$ = this.store.pipe(select(selectTheme));
    this.store.pipe(select(selectSettingsLanguage)).subscribe(lang => {
      this.translateService.use(lang);
      this.language = lang;
    });

    this.store.select(selectIsAuthenticated).subscribe(res => {
      this.isAuthenticated = res;
      this.traverseMenuItems(this.setupHiddenProp.bind(this));
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

  setupOnClickEvents(item): void {
    if (item.methods) {
      for (const method of item.methods) {
        item.onClick = this.menuItemsMap[method];
      }
    } else {
      item.onClick = () => {};
    }
  }

  setupHiddenProp(item): void {
    this.hideOnMobileProp(item);
    if (this.isAuthenticated) {
      if (item.path === '/authenticate') {
        item.hidden = true;
      }
    } else {
      if (item.path === '/logout') {
        item.hidden = true;
      }
    }
  }

  hideOnMobileProp(item): void {
    if (item.hideOnMobile) {
      if (this.mobileView) {
        item.hidden = true;
      } else {
        item.hidden = false;
      }
    } else {
        item.hidden = false;
    }

    if (item.hideOnDesktop) {
      if (!this.mobileView) {
        item.hidden = true;
      } else {
        item.hidden = false;
      }
    }
  }

  traverseMenuItems(updateFn): void {
    const traverse = (menuItems) => {
      menuItems.forEach(item => {
        if (!item.children) {
          updateFn(item);
        } else {
          if (item.hideOnMobile && this.mobileView) {
            item.hidden = true;
          } else {
            item.hidden = false;
          }
          traverse(item.children);
        }
      });
    };
    traverse(this.menuItems);
  }

  toggleSidenav(): void {
    if (!this.enableBack) {
      this.sidenav.toggle();
    } else {
      this.location.back();
    }
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

  onHomeClick(): void {
    console.log('Home Clicked');
  }

  onSearchClick(): void {
    const dialogRef = this.dialog.open(AppTestDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
  }
}

@Component({
  selector: 'app-test-example-dialog',
  templateUrl: 'app-test-dialog.html',
})
export class AppTestDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AppTestDialogComponent>) {}

  onClick(): void {
    this.dialogRef.close();
  }
}
