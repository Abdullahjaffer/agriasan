import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logged: boolean;
  constructor() {
    if(localStorage.getItem('me')){
      this.logged = true
    }else{
      this.logged = false;
    }
   }
}
