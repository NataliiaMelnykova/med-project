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

  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthenticationService) {
  }

  ngOnInit(): void {
    if (window.location.search.match('sign-in')) {
      this.auth
          .SignIn()
          .subscribe(() => {
            this.router.navigateByUrl('/home').then();
          })
    }
  }

  getLink() {
    this.auth
        .requestEmail(this.loginForm.get('email').value)
        .subscribe(
            (result) => {
              console.log('Success:', result);
            },
            error => {
              console.log('Error:', error);
            });
  }
}
