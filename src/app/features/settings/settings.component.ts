import { Component, OnInit } from '@angular/core';
import { LANGUAGES } from '../../shared/constants/languages';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { selectSettingsLanguage } from 'src/app/store/selectors/settings.selectors';
import { actionSettingsChangeLanguage } from 'src/app/store/actions/settings.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  languages = LANGUAGES;
  selectedLanguage = null;

  constructor(private store: Store<AppState>) {
    // this.store.select(selectSettingsLanguage).subscribe(res => {
    //   this.selectedLanguage = this.languages.find(lang => lang.value === res);
    // });
  }

  ngOnInit(): void {
  }

  changeLanguage(language): void {
    // this.translateService.use(lang);
    // this.store.dispatch(actionSettingsChangeLanguage({
    //   language
    // }));
  }

}
