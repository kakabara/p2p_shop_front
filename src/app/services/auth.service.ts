import { Injectable } from '@angular/core';
import {BaseRequests} from './base.requests';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private request: BaseRequests) { }

  public auhtorization(login, password) {
    return this.request.post('/authorize', {login: login, password: password});
  }

  public registration(login, password, phone) {
    return this.request.post('/registration', {login: login, password: password, phone: phone});
  }
}
