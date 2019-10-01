import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-commentcard',
  templateUrl: './commentcard.component.html',
  styleUrls: ['./commentcard.component.css']
})
export class CommentcardComponent implements OnInit {
  @Input() comment : any
  likecheck: boolean
  liked: boolean
  disliked: boolean
  
  likecount: number
  dislikecount: number
  constructor(private http: HttpClient) { 

  }
  

  ngOnInit() {
    this.likecount = this.comment.likes.length
    this.dislikecount = this.comment.dislikes.length
    var x = JSON.parse(localStorage.getItem('me'))
    console.log(x)
    if(this.comment.likes.includes(x._id)){
      this.liked = true
    }else{
      this.liked= false
    }
    if(this.comment.dislikes.includes(x._id)){
      this.disliked = true
    }else{
      this.disliked = false
    }
  }
  formattedDate(date) {
    return moment(date).format("DD/MM/YYYY")
  }
  likequestion(){
    this.http.get(`/api/v1/authed/comments/like/${this.comment._id}`).subscribe(res=>{
    if(!this.likecount){
      this.likecount = this.likecount+1
    }  
    this.liked = true
      if(this.disliked){
        this.dislikecount = this.dislikecount-1
      }
      this.disliked = false
      console.log("liked")
      },err=>{
        console.log(err)
      })
  }
  dislikequestion(){
    console.log(`http://10.50.204.58:8000/api/v1/authed/comments/dislike/${this.comment._id}`)
    this.http.get(`http://10.50.204.58:8000/api/v1/authed/comments/dislike/${this.comment._id}`).subscribe(res=>{
      if(!this.disliked){
        this.dislikecount = this.dislikecount+1
      }  
    this.disliked = true
    if(this.likecount){
      this.likecount = this.likecount-1
    }
      this.liked = false
      console.log("disliked")
      },err=>{
        console.log(err)
      })
  }
  unlikeanddis(){
    this.http.get(`http://10.50.204.58:8000/api/v1/authed/comments/unlikeanddis/${this.comment._id}`).subscribe(res=>{
      this.disliked = false
      this.liked = false
      console.log("unliked")
      },err=>{
        console.log(err)
      })
  }

}
