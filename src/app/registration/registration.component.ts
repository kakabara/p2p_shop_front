import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  template: `
    <div class="col-sm-12">
      <div style="display: flex; justify-content: center; align-items: center" class="mt-5">
        <form class="form-group" [formGroup]="form" (ngSubmit)="onSubmit()">
          <label for="login">Имя</label>
          <input  id="login" type="text" class="form-control" placeholder="Введите имя" formControlName="login">
          <label for="password">Пароль</label>
          <input  id="password" type="text" class="form-control" placeholder="Введите пароль" formControlName="password">
          <label for="phone">Телефон</label>
          <input  id="phone" type="text" class="form-control" placeholder="Введите телефон" formControlName="phone">
          <input type="submit" value="Зарегестрироваться" class="btn btn-outline-success mt-3" [disabled]="form.invalid">
        </form>
      </div>
    </div>


  `,
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private form: FormGroup;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
  }

  protected onSubmit() {
    if (this.form.value.login && this.form.value.password && this.form.value.phone) {
      this.authService.registration(this.form.value.login, this.form.value.password, this.form.value.phone)
        .subscribe( data => {
          localStorage.setItem('authToken', data['authToken']);
          this.router.navigate(['/']);
        });
    }
  }

}
