import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { actionSettingsChangeTheme, actionSettingsChangeLanguage } from 'src/app/store/actions/settings.actions';
import { Observable } from 'rxjs';
import { selectTheme, selectSettingsLanguage } from 'src/app/store/selectors/settings.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Hello';
  theme$: Observable<string>;
  language$: Observable<string>;

  fillerContent = Array(50).fill(0).map(() =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua.`);

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectTheme));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
  }

  changeLanguage(language): void {
    // this.translateService.use(lang);
    this.store.dispatch(actionSettingsChangeLanguage({
      language
    }));
  }

  changeTheme(theme): void {
    this.store.dispatch(actionSettingsChangeTheme({
      theme
    }));
  }

}
