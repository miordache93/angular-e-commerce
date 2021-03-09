import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { actionSettingsChangeTheme } from 'src/app/store/actions/settings.actions';
import { Observable } from 'rxjs';
import { selectTheme } from 'src/app/store/selectors/settings.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Hello';
  theme$: Observable<string>;
  language = 'en';

  fillerContent = Array(50).fill(0).map(() =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua.`);

  constructor(private translateService: TranslateService, private store: Store<any>) { }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectTheme));
  }

  changeLanguage(lang): void {
    this.translateService.use(lang);
  }

  changeTheme(theme): void {
    this.store.dispatch(actionSettingsChangeTheme({
      theme
    }));
  }

}
