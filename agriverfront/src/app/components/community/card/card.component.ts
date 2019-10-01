import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() da : any
  question: string
  description: string
  imageurl: string = null
  date: string
  liked: boolean
  disliked: boolean
  constructor(private http : HttpClient , private auth: AuthService, private login: LoginService) { 
    }
    formattedDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss")
  }
  ngOnInit() {
    console.log(this.da)
    this.liked = false;
    this.disliked = false;
    var x = JSON.parse(localStorage.getItem('me'))
    if(this.da.images.length>0){
      // console.log('========================from image len >0')
      this.imageurl = this.da.images[0]
    }    
    this.question = this.da.question['english']
    this.question = this.question.substring(0,150)
    this.description = this.da.description['english']
    this.description = this.description.substring(0,150)
    if(this.auth.isLoggedin){
      if(this.da.likes.includes(x._id)){
        this.liked = true
      }else{
        this.liked= false
      }
      if(this.da.dislikes.includes(x._id)){
        this.disliked = true
      }else{
        this.disliked = false
      }
    }
  }
  likequestion(){
    if(this.auth.isLoggedin){
      this.http.get(`/api/v1/authed/questions/like/${this.da._id}`).subscribe(res=>{
      this.liked = true
      this.disliked = false
      console.log("liked")
      },err=>{
        console.log(err)
      })
    }else{
      this.login.showLogin = true
    }
  }
  dislikequestion(){
    if(this.auth.isLoggedin){
      this.http.get(`/api/v1/authed/questions/dislike/${this.da._id}`).subscribe(res=>{
      this.disliked = true
      this.liked = false
      console.log("disliked")
      },err=>{
        console.log(err)
      })
    }
    else{
      this.login.showLogin = true
    }
  }
  unlikeanddis(){
    this.http.get(`/api/v1/authed/questions/unlikeanddis/${this.da._id}`).subscribe(res=>{
      this.disliked = false
      this.liked = false
      console.log("unliked")
      },err=>{
        console.log(err)
      })
  }
}

