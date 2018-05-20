import { Injectable } from '@angular/core';
import {BaseRequests} from './base.requests';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable()
export class ProductsService {

  constructor(private request: BaseRequests) { }

  public getProductById(id) {
    let reqUrl = '/products/';
    if (id) {
      reqUrl = reqUrl + id;
    }
    return this.request.get(reqUrl);
   }
}

