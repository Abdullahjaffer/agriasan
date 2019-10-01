import { Component, OnInit } from '@angular/core';
import { LanguageService } from './../../services/language.service'
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  acctypes:any = [
    {num: 0, name: {
      english: 'Farmer',
      urdu: 'کسان'
    }},
    {num: 1, name: {
      english: 'Agriculture Researcher',
      urdu: 'زراعت کے محقق'
    }},
    {num: 2, name: {
      english: 'Pesticides Company',
      urdu: 'کیڑے مار دوا کمپنی'
    }}
];
  selectedacctype: string;
  phone_number: Number;
  constructor(private languageservice : LanguageService ,private login : LoginService) {
    this.selectedacctype = this.acctypes[0].name[this.languageservice.language]
    console.log(this.selectedacctype)
   }

  ngOnInit() {
    console.log(this.login.showSignup)
  }
  cons(val: any){
    console.log(val)
  }
  onSubmit(data: any){
    console.log(this.selectedacctype)
    console.log(data)
  }

}
