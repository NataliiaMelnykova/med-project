import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MomentModule} from "ngx-moment";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatModule} from "./modules/mat.module";
import {environment} from "../environments/environment";
import {AcceptedComponent} from './pages/patients/accepted/accepted.component';
import {UnacceptedComponent} from './pages/patients/unaccepted/unaccepted.component';
import {HomeComponent} from './pages/home/home.component';
import {EditPatientComponent} from './pages/patients/edit-patient/edit-patient.component';
import {ViewPatientComponent} from './pages/patients/view-patient/view-patient.component';
import {MatMomentDateModule} from "@angular/material-moment-adapter";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AcceptedComponent,
    UnacceptedComponent,
    HomeComponent,
    EditPatientComponent,
    ViewPatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    MomentModule,
    MatMomentDateModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ua',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
