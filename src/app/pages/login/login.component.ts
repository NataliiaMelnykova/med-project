import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthenticationService} from "../../core/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() email: FormControl;

  progress = {
    running: false,
    message: "Something went wrong"
  };

  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthenticationService) {
  }

  ngOnInit(): void {
    if (window.location.search.match('sign-in')) {
      this.status(true, "Last check before login");
      this.auth
          .SignIn()
          .subscribe(() => {
            this.auth.navigateHome()
          }, error => {
            console.warn('Error:', error);
            this.status(false);
          })
    }
  }

  getLink() {
    this.status(true, "Sending login link to email");
    this.auth
        .requestEmail(this.loginForm.get('email').value)
        .subscribe(
            () => {
              this.status(true, "Check your email for link");
            },
            error => {
              console.warn('Error:', error);
              this.status(false, "Message was not send");
            });
  }

  status(running: boolean, message?: string) {
    this.progress = {running, message};
  }
}
