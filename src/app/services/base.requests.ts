import {Injectable} from '@angular/core';
import {  } from ''

import * as url from 'url';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BaseRequests {
  baseUrl = 'http://127.0.0.1:5000/';
  headers: HttpHeaders;
  options: {};
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.headers = new HttpHeaders({
        'X-Auth-Token': token
      });
    }
    this.options = {headers: this.headers};
  }

  public get(path: string) {
    return this.http.get(
      url.resolve(this.baseUrl, path),
      this.options
    );
  }

  public post(path: string, body) {
    return this.http.post(url.resolve(this.baseUrl, path), JSON.stringify(body), this.options);
  }

  public delete(path: string) {
    return this.http.delete(url.resolve(this.baseUrl, path), this.options);
  }

  public patch(path: string, body) {
    return this.http.patch(url.resolve(this.baseUrl, path), JSON.stringify(body), this.options);
  }

}
