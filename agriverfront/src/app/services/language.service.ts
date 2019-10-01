import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language: string;
  
  constructor() {
    this.language = 'urdu'
  }
  setUrdu(){
    console.log('from language service set to urdu')
    this.language = 'urdu'
  }
  setEnglish(){
    console.log('from language service set to english')
    this.language = 'english'
  }
}
