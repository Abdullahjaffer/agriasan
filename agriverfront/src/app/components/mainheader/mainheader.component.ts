import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from './../../services/login.service'
import { LanguageService } from './../../services/language.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent implements OnInit {
  loginShow : boolean;
  signupShow : boolean;
  languageCheck : boolean
  constructor( private login : LoginService,
    private language : LanguageService,
    private renderer : Renderer2, public auth: AuthService, private router : Router) {
   }

  ngOnInit() {
    this.languageCheck = false
    this.cons(false)
  }

  cons(val: any){
    if(val == true){
      this.renderer.removeClass(document.body, 'english')
      this.language.setUrdu();
      this.renderer.addClass(document.body, 'urdu');
    }
    if(val == false){
      this.renderer.removeClass(document.body, 'urdu')
      this.language.setEnglish();
      this.renderer.addClass(document.body, 'english');
    }
  }
  logout(){
    this.auth.logout()
    this.router.navigate(['']);
  }

}
