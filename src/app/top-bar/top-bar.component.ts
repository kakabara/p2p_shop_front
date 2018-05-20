import {Component, Input, OnInit, Output} from '@angular/core';

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
          <a class="nav-item nav-link" [ngClass] ="{'disabled': getAuth()}">Избранное</a>
          <a class="nav-item nav-link" [ngClass] ="{'disabled': getAuth()}">Ваши Товары</a>
        </div>
      </div>
      <div class="col-sm-5 row">
        <div class="form-inline">
          <input class="form-control mr-sm-2" type="text" placeholder="Логин" aria-label="Login">
          <input class="form-control mr-sm-2" type="password" placeholder="Пароль" aria-label="Password">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Войти</button>
        </div>
      <button type="button" class="btn btn-outline-dark ml-1" routerLink="/registration" >Регистрация</button>
      </div>
      <div *ngIf="authToken">
      <button type="button" (click)="logout()" class="btn btn-outline-danger">Выйти</button>
      </div>
    </nav>
  `,
})
export class TopBarComponent implements OnInit {
  @Input() authToken;
  @Output() action;
  constructor() { }

  ngOnInit() {
  }
  private getAuth() {
    return localStorage.getItem('authToken');
  }

  private logout() {
    localStorage.removeItem('authToken');

  }

}
