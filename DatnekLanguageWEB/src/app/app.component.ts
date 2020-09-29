import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserLanguage} from './models/user-language';
import {Language} from './models/language';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from './services/language.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public translate: TranslateService,
    private modalService: NgbModal,
    private languageService: LanguageService,
    private ngxService: NgxUiLoaderService,
    private notifyService: NotificationService) {

    this.onLoadLanguage();
    this.onLoadUserLanguage();
  }

  userLang: UserLanguage = {
    compLevel: '',
    writtenLevel: '',
    levelSpeacks: '',
    language: null,
    languageID: 0,
    id: 0,
    userID: null
  };
  userLangDetail: UserLanguage;
  langs: Language[] = [];
  langList: string[] = [];
  userLangs: UserLanguage[] = [];
  isOpen = false;
  activeLang = [true, false, false];
  onCreate = true;

  switchLang(lang: string, index: number) {
    console.log(lang)
    for(let i = 0; i< this.activeLang.length; i++){
      index == i ? this.activeLang[i] = true : this.activeLang[i] = false
    }
    this.translate.use(lang);
  }

  open(content, index) {
    this.userLangDetail = this.userLangs[index];
    this.isOpen = !this.isOpen;

    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
      this.isOpen = !this.isOpen;
    });
  }

  onLoadLanguage(){
    this.languageService.getLang().subscribe(
      value => {
        this.langs = value;
        console.log(value);

        this.langs.forEach(value1 => this.langList.push(value1.name));
        // add langs and configure default
        console.log(this.langList);
        this.translate.addLangs(this.langList.length > 0 ? this.langList : ['en']);
        this.translate.setDefaultLang(this.langList.length > 0 ? this.langList[0] : 'en');
        this.translate.currentLang =  this.langList.length > 0 ? this.langList[0] : 'en';
      }
    )
  }
  onLoadUserLanguage(){
    this.languageService.getUserLang().subscribe(
      value => {
        this.userLangs = value;
        console.log(value);

        // init variable for create and edit section
        this.userLang = {
          compLevel: '',
          writtenLevel: '',
          levelSpeacks: '',
          language: null,
          languageID: 0,
          id: 0,
          userID: null
        };
      }
    )
  }
  onPostUserLanguage(){
    this.ngxService.start();
    this.languageService.postUserLang(this.userLang).subscribe(
      value => {
        console.log(value);
        this.onCreate = true;
        this.onLoadUserLanguage();

        this.ngxService.stop();
        this.notifyService.showSuccess("Enregistrer avec succes!")
      },
      error => {
        console.log(error);

        this.ngxService.stop();
        this.notifyService.showError("Echec de modification!")
      }
    )
  }
  onPutUserLanguage(){
    this.ngxService.start();
    this.languageService.putUserLang(this.userLang).subscribe(
      value => {
        console.log(value);
        this.onLoadUserLanguage();
        this.onCreate = true;
        this.ngxService.stop();
        this.notifyService.showSuccess("Modifier avec succes!")
      },
      error => {
        console.log(error);

        this.ngxService.stop();
        this.notifyService.showError("Echec d'enregistrement!")
      }
    )
  }
  onDeleteUserLanguage(id: number){
    this.ngxService.start();
    this.languageService.deleteUserLang(+id).subscribe(
      value => {
        console.log(value);
        this.onLoadUserLanguage();

        this.ngxService.stop();
        this.notifyService.showSuccess("Supprimer avec succes!")
      },
      error => {
        console.log(error);

        this.ngxService.stop();
        this.notifyService.showError("Echec de suppression!")
      }
    )
  }

  onSubmit(){
    this.userLang.languageID = +this.userLang.languageID;
    if(this.onCreate)
      this.onPostUserLanguage();
    else
      this.onPutUserLanguage();
  }

  cancelUpdate(){
    this.onCreate = true;
    this.userLang = {
      compLevel: '',
      writtenLevel: '',
      levelSpeacks: '',
      language: null,
      languageID: 0,
      id: 0,
      userID: null
    };
  }
  goToEdit(userLang: UserLanguage){
    this.userLang = userLang;
    this.onCreate = false;
  }
}
