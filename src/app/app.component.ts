import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./core/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'medical-service';

  constructor(public auth: AuthenticationService) {
    this.auth.user.subscribe(() => {
      this.auth.navigateHome();
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.SignOut().subscribe();
  }
}
