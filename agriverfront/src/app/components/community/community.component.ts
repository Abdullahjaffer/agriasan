import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  
  data: any
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.data = []
    // this.http.get('http://localhost:8000/api/v1/authed/user/me').subscribe(res=>{
    // console.log(res)
    // localStorage.setItem('me', JSON.stringify(res))
    // this.http.get('http://localhost:8000/api/v1/public/questions').subscribe(res=>{
    // this.data = res
    // console.log(res)
    // },err=>{
    //   console.log(err)
    // })
    // },
    // err=>{
    //   this.http.get('http://localhost:8000/api/v1/public/questions').subscribe(res=>{
    // this.data = res
    // console.log(res)
    // },err=>{
    //   console.log(err)
    // })
    // })
    this.http.get('/api/v1/public/questions').subscribe(res=>{
    this.data = res
    console.log(res)
    },err=>{
      console.log(err)
    })
  }
  onSubmit(data:any){
    this.http.get(`/api/v1/public/questions/search/${data.query}`).subscribe(res=>{
    this.data = res

    console.log(res)
    },err=>{
      console.log(err)
    })
  }
  lengthBased(){
    if(this.data.length > 0){
      return true
    }
    else{
      return false
    }
  }

}
