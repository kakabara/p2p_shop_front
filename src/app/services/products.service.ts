import { Injectable } from '@angular/core';
import {BaseRequests} from './base.requests';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ProductsService {

  constructor(private request: BaseRequests,
              private http: HttpClient) { }

  public getProductByUserId(userId) {
    return this.http.get('http://127.0.0.1:5000/products/', { headers: {
          'Content-Type': 'application/orion.api+json',
          Accept: 'application/orion.api+json'
      }}).subscribe( data => console.log(data));
  }
}

