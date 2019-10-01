import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  showLogin: boolean;
  showSignup: boolean;
  constructor() {
    this.showLogin = false
    this.showSignup = false
   }
}
