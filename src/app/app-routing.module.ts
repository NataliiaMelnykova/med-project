import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PatientsComponent} from "./pages/patients/patients.component";
import {LoginComponent} from "./pages/login/login.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: PatientsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
