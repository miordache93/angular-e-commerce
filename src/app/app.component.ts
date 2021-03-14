import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatToolbar } from '@angular/material/toolbar';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTheme, selectSettingsLanguage } from './store/selectors/settings.selectors';
import { actionSettingsChangeTheme } from './store/actions/settings.actions';
import { routeAnimations } from './shared/constants/route.animations';
import { Router } from '@angular/router';
import { MENU_ITEMS } from './shared/constants/menu-items';

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

  @ViewChild(MatSidenavContainer, { static: true }) sidenavContainer: MatSidenavContainer;
  @ViewChild(CdkScrollable, { static: true }) scrollable: CdkScrollable;
  @ViewChild(MatSidenavContent, { static: true }) content: MatSidenavContent;
  @ViewChild('toolBara', { static: true }) toolbar: MatToolbar;

  constructor(private translateService: TranslateService,
              private router: Router,
              private store: Store<any>) {
    translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectTheme));
    this.store.pipe(select(selectSettingsLanguage)).subscribe(lang => {
      this.translateService.use(lang);
      this.language = lang;
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
    this.sidenavContainer.close()
  }
}
