import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./core/auth.guard";
import {GuestGuard} from "./core/guest.guard";
import {HomeComponent} from "./pages/home/home.component";
import {AcceptedComponent} from "./pages/patients/accepted/accepted.component";
import {UnacceptedComponent} from "./pages/patients/unaccepted/unaccepted.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'patients/accepted', component: AcceptedComponent, canActivate: [AuthGuard]},
  {path: 'patients/unaccepted', component: UnacceptedComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
