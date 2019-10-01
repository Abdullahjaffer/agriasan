import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router'
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
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
  fileData: File = null;
  selectedacctype: object;
  url: Array<String> = []
  name = ''
  constructor(private languageservice : LanguageService,
    private _DomSanitizationService: DomSanitizer,private http : HttpClient, private router : Router) { }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }
  ngOnInit() {
    let x =  JSON.parse(localStorage.getItem('me'))
    this.name = x.fullname
  }
  
  async onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      // const fileReader: FileReader = new FileReader();
      for( let i=0; i < event.target.files.length; i++){
        var reader = new FileReader();
        await reader.readAsDataURL(event.target.files[i]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
        this.url.push(reader.result.toString())
      }
      }
    }
}

onSubmit(data:any){
  let packet = {
    "images" : this.url,
    "question" :{
      english : data.Question,
      urdu : data.Question
    },
    "description":{
      english : data.Description,
      urdu : data.Description
    },
  }
  this.http.post('/api/v1/authed/questions',packet).subscribe(res=>{
    let x: any = res
    this.router.navigate([`post/${x._id}`]);
  },err=>{
    alert(err)
    console.log(err)
  })
}
}