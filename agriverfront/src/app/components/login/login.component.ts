import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  WrongErr: boolean
  constructor( public login : LoginService, private http: HttpClient, private auth: AuthService , private router: Router) {
    
  }

  ngOnInit() {
    this.WrongErr = false
  }
  onSubmit(data: any){
    let packet =  {
      username : data.phone_number,
      password : data.Password
    }
    this.http.post('/api/v1/public/user/login',packet).subscribe((obj)=>{
      this.WrongErr = false
      this.auth.setData(obj)
      console.log(obj)
      this.login.showLogin = false
      this.router.navigate(['community']);
    },(err)=>{
      this.WrongErr = true
      console.log(err)
    })
  }
}
