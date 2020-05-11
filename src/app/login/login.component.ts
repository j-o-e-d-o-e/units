import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;
  loading: boolean = false;
  error: boolean;
  logout: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.logout().then(
        () => this.logout = true,
        (error) => console.log(error)
      );
    }
  }

  onSubmit() {
    this.loading = true;
    this.error = false;
    this.logout = false;
    let mail;
    let password;
    mail = this.form.value.mail;
    password = this.form.value.password;
    this.auth.login(mail, password).then(
      () => {
        this.router.navigate(['/available']).catch();
      },
      () => {
        this.error = true;
        this.loading = false;
        this.form.resetForm();
      });
  }
}
