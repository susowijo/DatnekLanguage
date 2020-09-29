import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserLanguage} from './models/user-language';
import {Language} from './models/language';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    private modalService: NgbModal) {
    translate.addLangs(['fr', 'en', 'nl']);
    translate.setDefaultLang('fr');
    translate.currentLang =  'fr';
  }
  // userLang: UserLanguage = {
  //   CompLevel: '',
  //   WrittenLevel: '',
  //   LevelSpeacks: '',
  //   Language: null,
  //   LanguageID: 0,
  //   ID: 1,
  //   UserID: null
  // };
  userLang: UserLanguage = {
    CompLevel: '_elementary',
    WrittenLevel: '_intermediate',
    LevelSpeacks: '_fluent',
    Language: {
      ID: 2,
      Name: 'en'
    },
    LanguageID: 1,
    ID: 1,
    UserID: 1
  };
  langs: Language[] = [
    {
      ID: 1,
      Name: 'fr'
    },
    {
      ID: 2,
      Name: 'en'
    },
    {
      ID: 3,
      Name: 'nl'
    }
  ];
  userLangs: UserLanguage[] = [
    {
      CompLevel: '_elementary',
      WrittenLevel: '_intermediate',
      LevelSpeacks: '_fluent',
      Language: {
          ID: 2,
          Name: 'en'
      },
      LanguageID: 1,
      ID: 1,
      UserID: 1
    },
    {
      CompLevel: '_elementary',
      WrittenLevel: '_intermediate',
      LevelSpeacks: '_fluent',
      Language: {
          ID: 1,
          Name: 'fr'
      },
      LanguageID: 1,
      ID: 1,
      UserID: 1
    },
  ];
  modalText = '_modal_closed';
  activeLang = [true, false, false];

  switchLang(lang: string, index: number) {
    for(let i = 0; i< this.activeLang.length; i++){
      index == i ? this.activeLang[i] = true : this.activeLang[i] = false
    }
    this.translate.use(lang);
  }

  open(content) {
    this.modalText = '_modal_opened';
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
      this.modalText = '_modal_closed';
    });
  }
}
