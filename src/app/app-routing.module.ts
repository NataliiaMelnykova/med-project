import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./core/auth.guard";
import {GuestGuard} from "./core/guest.guard";
import {HomeComponent} from "./pages/home/home.component";
import {AcceptedComponent} from "./pages/patients/accepted/accepted.component";
import {UnacceptedComponent} from "./pages/patients/unaccepted/unaccepted.component";
import {EditPatientComponent} from "./pages/patients/edit-patient/edit-patient.component";
import {ViewPatientComponent} from "./pages/patients/view-patient/view-patient.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'patients/accepted', component: AcceptedComponent, canActivate: [AuthGuard]},
  {path: 'patients/unaccepted', component: UnacceptedComponent, canActivate: [AuthGuard]},
  {path: 'patients/add', component: EditPatientComponent, canActivate: [AuthGuard]},
  {path: 'patients/id/:id', component: ViewPatientComponent, canActivate: [AuthGuard]},
  {path: 'patients/id/:id/edit', component: EditPatientComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
