import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../../services/location.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-researchersignup',
  templateUrl: './researchersignup.component.html',
  styleUrls: ['./researchersignup.component.css']
})
export class ResearchersignupComponent implements OnInit {
  verificationWindow: boolean
  form:any
  phonenumberErr: boolean
  constructor(private locationService : LocationService,
    private http: HttpClient) { }
  ngOnInit() {
    this.phonenumberErr = false
    this.verificationWindow = false;
    this.form={}
  }
  onSubmit(data: any){
    this.http.get(`/api/v1/public/user/checknumber/${data.phone_number}`).subscribe(obj=>{
      this.locationService.getPosition().then(pos=>
        { 
           this.form = Object.assign({}, pos, data);
           this.form = {...this.form, type: 'Research'}
           console.log(this.form)
           this.http.post(`/api/v1/public/user/addverify`,{phonenumber: this.form.phone_number}).subscribe(obj=>{
           this.verificationWindow = true
          },err=>{

          })
           
        })
        console.log("from submit"+data)
    },err=>{
      this.phonenumberErr = true
    })
  }
  cons(data: any){
    console.log(data)
  }
}
