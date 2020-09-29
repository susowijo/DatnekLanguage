import {Language} from './language';

export interface UserLanguage {
  id: number;
  languageID: number;
  userID: number;
  levelSpeacks: string;
  writtenLevel: string;
  compLevel: string;
  language: Language;
}
