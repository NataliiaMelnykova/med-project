import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./core/authentication.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthenticationService) {
    this.auth.user.subscribe((user) => {
      if (!user) {
        this.auth.navigateHome();
      }
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.SignOut().subscribe();
  }
}
