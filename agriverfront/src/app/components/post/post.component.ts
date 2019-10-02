import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { LanguageService } from './../../services/language.service'
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: string;
  data: any;
  question: string=''
  description: string =''
  frontimage: string
  comments: any
  liked: boolean
  disliked: boolean
  constructor(private route: ActivatedRoute, 
  private http : HttpClient, 
  private lang :  LanguageService, 
  private auth: AuthService,
  private login: LoginService
  ) {
    this.liked = false;
    this.disliked = false;
  }
  formattedDate(date) {
    return moment(date).fromNow()
  }
  ngOnInit() {
    this.route.params.subscribe( params => {
      this.id = params.id
      console.log(params)
    } );
    var x = JSON.parse(localStorage.getItem('me'))
    this.http.get(`/api/v1/public/questions/post/${this.id}`).subscribe(res=>{
      this.data = res
      console.log(this.data)
      this.question = this.data.question[this.lang.language]
      this.description = this.data.description[this.lang.language]
      if(this.data.images){
        this.frontimage = this.data.images[0]
      }
      if(this.auth.isLoggedin){
        if(this.data.likes.includes(x._id)){
          this.liked = true
        }else{
          this.liked= false
        }
        if(this.data.dislikes.includes(x._id)){
          this.disliked = true
        }else{
          this.disliked = false
        }
      }
      this.http.get(`/api/v1/public/comments/${this.data._id}`).subscribe(res=>{
        this.comments = res
      },err=>{
      })
      console.log(res)
      },err=>{
        
      })
      
  }
  onSubmit(data:any){
    let packet = {
      text:{
        "english": data.Comment,
        "urdu": data.Comment
      }
    }
    this.http.post(`/api/v1/authed/comments/${this.data._id}`,packet).subscribe(res=>{
    console.log(res)
  },err=>{
    console.log(err)
  })
  }

  likequestion(){
    if(this.auth.isLoggedin){
      this.http.get(`/api/v1/authed/questions/like/${this.data._id}`).subscribe(res=>{
      this.liked = true
      this.disliked = false
      },err=>{
        console.log(err)
      })
    }else{
      this.login.showLogin = true
    }
  }
  dislikequestion(){
    if(this.auth.isLoggedin){
      this.http.get(`/api/v1/authed/questions/dislike/${this.data._id}`).subscribe(res=>{
      this.disliked = true
      this.liked = false
      },err=>{
        console.log(err)
      })
    }
    else{
      this.login.showLogin = true
    }
  }
  unlikeanddis(){
    if(this.auth.isLoggedin){
      this.http.get(`/api/v1/authed/questions/unlikeanddis/${this.data._id}`).subscribe(res=>{
      this.disliked = false
      this.liked = false
      },err=>{
        console.log(err)
      })
    }else{
      this.login.showLogin = true
    }
  }
  
}
