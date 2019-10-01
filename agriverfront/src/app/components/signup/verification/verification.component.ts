import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService} from '../../../services/auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  @Input() data:any
  constructor( private  http: HttpClient, private auth : AuthService, public router: Router) { }
  ngOnInit() {
    console.log(this.data)
  }
  onSubmit(data: any){
    console.log(data)
    let packet = {...this.data, 'verificationcode': data.code }
    console.log(packet)
    this.http.post("/api/v1/public/user/signup",packet).subscribe(object=>{
    console.log(object)
    this.auth.setData(object)
    this.router.navigate(['community']);
    },err=>{
      console.log(err)
    })
  }

}
