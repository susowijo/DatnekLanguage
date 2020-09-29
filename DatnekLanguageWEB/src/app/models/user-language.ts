import {Language} from './language';

export interface UserLanguage {
  ID: number;
  LanguageID: number;
  UserID: number;
  LevelSpeacks: string;
  WrittenLevel: string;
  CompLevel: string;
  Language: Language;
}
