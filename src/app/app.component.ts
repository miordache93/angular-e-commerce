import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatToolbar } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'Angular E-Commerce';
  otherTheme = false;


  @ViewChild(MatSidenavContainer, {static: true }) sidenavContainer: MatSidenavContainer;
  @ViewChild(CdkScrollable, {static: true }) scrollable: CdkScrollable;
  @ViewChild(MatSidenavContent, { static: true }) content: MatSidenavContent;
  @ViewChild('toolBara', {static: true }) toolbar: MatToolbar;

  constructor(private translate: TranslateService, private store: Store<any>) {
    translate.setDefaultLang('en');
    this.store.select(state => state).subscribe(res => {
      this.otherTheme = res.appSettings.darkTheme;
    });
  }

  ngAfterViewInit(): void {
    this.scrollable.elementScrolled().subscribe((event) => {
      console.log(event);
      const scrollTop = this.sidenavContainer.scrollable.getElementRef().nativeElement.scrollTop;
      if (scrollTop > 0) {
        this.toolbar._elementRef.nativeElement.classList.add('sticky');
        this.toolbar._elementRef.nativeElement.classList.remove('fixed');
        // console.log('SCroll', "sticky");
      } else {
        this.toolbar._elementRef.nativeElement.classList.add('fixed');
        this.toolbar._elementRef.nativeElement.classList.remove('sticky');
      }
    });
  }

  changeTheme(): void {
    this.otherTheme = !this.otherTheme;
  }
}
