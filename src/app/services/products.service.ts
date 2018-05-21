import { Injectable } from '@angular/core';
import {BaseRequests} from './base.requests';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

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

   public getFavoriteProduct() {
    return this.request.get('/favorites');
   }

   public getProductByUser() {
    return this.request.get('/user-products');
   }

   public createProduct(body) {
    return this.request.post('/create-product', body);
   }
}

