import {Injectable} from '@angular/core';
import {  } from ''

import * as url from 'url';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BaseRequests {
  baseUrl = 'http://127.0.0.1:5000/';
  headers: HttpHeaders = new HttpHeaders({
    'X-Auth-Token': localStorage.getItem('authToken')
  });
  options = {headers: this.headers};

  constructor(private http: HttpClient) {}

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
