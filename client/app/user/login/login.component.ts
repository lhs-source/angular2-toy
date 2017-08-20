import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../auth.service';
import { ToastComponent } from '../../uis/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  email = new FormControl('', [Validators.required,
                                       Validators.minLength(3),
                                       Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required,
                                          Validators.minLength(6)]);

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder,
              private router: Router) { }

    registerPopup : boolean = false;

  ngOnInit() {

        console.log("Component : login(onInit)");
    if (this.auth.loggedIn) {
      this.router.navigate(['/chats']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }
    ngOnDestroy(){
        console.log("Component : login(onDestroy)");
    }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      res => {
        this.router.navigate(['/chats']);
      },
      error => this.toast.setMessage('invalid email or password!', 'danger')
    );
  }

  register(){
    this.registerPopup = !this.registerPopup;
    console.log(this.registerPopup);
  }

}
