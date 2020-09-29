import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserLanguage} from '../models/user-language';
import {Language} from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  baseAddress = "https://localhost:44369/api/";
  header = new HttpHeaders();
  baseOptions = {headers: this.header.append("Content-Type", "application/json")};

  constructor(private httpClient: HttpClient) { }

  // ----------------------------   GET REQUEST -----------------------------
  public getLang(){
    return this.httpClient.get<Language[]>(this.baseAddress + "Languages", this.baseOptions);
  }

  public getUserLang(){
    return this.httpClient.get<UserLanguage[]>(this.baseAddress + "UserLanguages", this.baseOptions);
  }

  // ----------------------------  POST REQUEST  -----------------------------
  public postUserLang(userLang: UserLanguage){
    return this.httpClient.post<UserLanguage>(this.baseAddress + "UserLanguages", userLang, this.baseOptions);
  }

  // ----------------------------  PUT REQUEST  -----------------------------
  public putUserLang(userLang: UserLanguage){
    return this.httpClient.put(this.baseAddress + "UserLanguages/" + userLang.id, userLang, this.baseOptions);
  }

  // ----------------------------  DELETE REQUEST  -----------------------------
  public deleteUserLang(id: number){
    return this.httpClient.delete(this.baseAddress + "UserLanguages/" + id, this.baseOptions);
  }
}
