import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { CommunityComponent } from './components/community/community.component';
import { PostComponent } from './components/post/post.component';
import { MainheaderComponent } from './components/mainheader/mainheader.component';
import { FormsModule} from '@angular/forms'
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { LanguageService } from './services/language.service';
import { CardComponent } from './components/community/card/card.component';
import { AddpostComponent } from './components/addpost/addpost.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { TokenInterceptor } from './services/token.interceptor';
import { FarmersignupComponent } from './components/signup/farmersignup/farmersignup.component';
import { ResearchersignupComponent } from './components/signup/researchersignup/researchersignup.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommentcardComponent } from './components/post/commentcard/commentcard.component';
import { LoaderComponent } from './components/loader/loader.component';
import { VerificationComponent } from './components/signup/verification/verification.component';
import { LocationService } from './services/location.service';
import { AuthService} from './services/auth.service'
@NgModule({
  declarations: [
    AppComponent,
    CommunityComponent,
    PostComponent,
    MainheaderComponent,
    LoginComponent,
    SignupComponent,
    CardComponent,
    AddpostComponent,
    FarmersignupComponent,
    ResearchersignupComponent,
    CommentcardComponent,
    LoaderComponent,
    VerificationComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    InternationalPhoneNumberModule
  ],
  providers: [
    LocationService,
    AuthService,
    LoginService,
    LanguageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
