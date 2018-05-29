import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" routerLink="">P2P SHOP</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link" routerLink="">Главная</a>
          <a class="nav-item nav-link" routerLink='/products' [routerLinkActive]="['active']">Список товаров</a>
          <a class="nav-item nav-link" routerLink='/favorites' [ngClass] ="{'disabled': !authToken}">Избранное</a>
          <a class="nav-item nav-link" routerLink='/your-products' [ngClass] ="{'disabled': !authToken}">Ваши Товары</a>
          <a class="nav-item nav-link" routerLink='/add-product' [ngClass] ="{'disabled': !authToken}">Добавить товар</a>
        </div>
      </div>
      <div class="col-sm-6 row" *ngIf="!authToken">
        <div class="form-inline">
          <input [(ngModel)]="login" name="login" class="form-control mr-sm-2" type="text" placeholder="Логин" aria-label="Login">
          <input [(ngModel)]="password" class="form-control mr-sm-2" type="password" placeholder="Пароль" aria-label="Password">
          <input [(ngModel)]="destroyAuth" type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Не сохранять</label>
          <button class="btn btn-outline-success my-2 my-sm-0" (click)="authorization()">Войти</button>
        </div>
      <button type="button" class="btn btn-outline-dark ml-1" routerLink="/registration" >Регистрация</button>
      </div>
      <div *ngIf="authToken">
        <p class="card-text border-bottom">Вы, {{ getLogin() }}</p>
        <button type="button" (click)="logout()" class="btn btn-outline-danger">Выйти</button>
      </div>
    </nav>
  `,
})
export class TopBarComponent implements OnInit, OnDestroy {
  login: string;
  password: string;
  destroyAuth = false;
  authToken: string |undefined;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('destroy') ? localStorage.getItem('destroy') : undefined) {
      localStorage.clear();
    }
    this.changeAuth();
  }


  private logout() {
    this.router.navigate(['']);
    this.authToken = undefined;
    localStorage.clear();
  }

  ngOnDestroy() {
    if (this.destroyAuth) {
      localStorage.removeItem('authToken');
    }
  }

  changeAuth() {
    this.authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : undefined;
  }

  private authorization() {
    if (this.login && this.password) {
      this.authService.auhtorization(this.login, this.password)
        .subscribe( data => {
          localStorage.setItem('authToken', data['auth_token']);
            localStorage.setItem('user_id', data['user_id']);
            localStorage.setItem('user_login', data['user']['login']);
            this.changeAuth();
            this.router.navigate(['']);
          }
        , () => alert('Неверные данные'));
    }
    if (this.destroyAuth) {
      localStorage.setItem('destroy', 'true');
    }
  }

  private getLogin() {
    return localStorage.getItem('user_login');
  }

}
