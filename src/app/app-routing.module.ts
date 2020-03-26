import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PatientsComponent} from "./pages/patients/patients.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./core/auth.guard";
import {GuestGuard} from "./core/guest.guard";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: PatientsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
