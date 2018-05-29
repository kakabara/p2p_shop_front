import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import * as url from 'url';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

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
    this.options = {
      headers: this.headers,
      reportProgress: true
    };
  }

  public get(path: string) {
    const req = new HttpRequest('GET',  url.resolve(this.baseUrl, path), this.options);
    let subject = new Subject<any>();
    this.http.request(req).subscribe((event) => {
      if (event instanceof HttpResponse) {
        subject.next(event.body);
      }
    });
    return subject.asObservable();
  }

  public post(path: string, body) {
    let subject = new Subject<any>();
    const req = new HttpRequest('POST', url.resolve(this.baseUrl, path), body, this.options);
    this.http.request(req).subscribe((event) => {
      if (event instanceof HttpResponse) {
        subject.next(event.body);
      }
    });
    return subject.asObservable();
  }

  public delete(path: string) {
    let subject = new Subject<any>();
    const req = new HttpRequest('DELETE', url.resolve(this.baseUrl, path), this.options);
    this.http.request(req).subscribe((event) => {
      if (event instanceof HttpResponse) {
        subject.next(event.body);
      }
    });
    return subject.asObservable();
  }

  public patch(path: string, body) {
    let subject = new Subject<any>();
    const req = new HttpRequest('PATCH', url.resolve(this.baseUrl, path), body, this.options );
    this.http.request(req).subscribe((event) => {
      if (event instanceof HttpResponse) {
        subject.next(event.body);
      }
    });
    return subject.asObservable();
  }


}
