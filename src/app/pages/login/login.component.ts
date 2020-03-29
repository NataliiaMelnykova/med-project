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
    message: "WRONG"
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
      this.status(true, "CONFIRMING");
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
    this.status(true, "SENDING");
    this.auth
        .requestEmail(this.loginForm.get('email').value)
        .subscribe(
            () => {
              this.status(true, "SENT");
            },
            error => {
              console.warn('Error:', error);
              this.status(false, "NOT_SENT");
            });
  }

  status(running: boolean, message?: string) {
    this.progress = {running, message: "LOGIN.MESSAGES." + message};
  }
}
