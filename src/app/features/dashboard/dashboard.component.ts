import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppSettingsState } from 'src/app/ngrx/reducers/settings.reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Hello';
  theme = false;
  language = 'en';

  fillerContent = Array(50).fill(0).map(() =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua.`);

  constructor(private translateService: TranslateService, private store: Store<any>) {
    this.store.select(state => state.appSettings.darkTheme).subscribe(res => {
      this.theme = res;
    });
   }

  ngOnInit(): void {
  }

  changeLanguage(lang): void {
    this.translateService.use(lang);
  }

  changeTheme(): void {
    this.theme = !this.theme;
    this.store.dispatch({
      type: 'CHANGE_APP_SETTINGS',
      payload: {
        darkTheme: this.theme
      }
    });
  }

}
