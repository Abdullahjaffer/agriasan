import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityComponent } from './components/community/community.component';
import { PostComponent } from './components/post/post.component'
import { AddpostComponent } from './components/addpost/addpost.component'
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard} from './guards/auth.guard'
const routes: Routes = [{
  path: 'community',component: CommunityComponent 
},
{
  path: 'post/:id',component: PostComponent 
},
{
  path: 'addpost',component: AddpostComponent ,canActivate: [AuthGuard]
},
{
  path: 'signup',component: SignupComponent 
},
{
  path: '', redirectTo: 'community', pathMatch: 'full'
},
{
  path: '**', redirectTo: 'community', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
