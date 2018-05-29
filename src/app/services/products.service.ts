import { Injectable } from '@angular/core';
import {BaseRequests} from './base.requests';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class ProductsService {

  constructor(private request: BaseRequests) { }

  public getAllProducts() {
    return this.request.get('/products/?deleted_at=&bought_by=');
  }

  public getProductById(id) {
    let reqUrl = '';
    if (id) {
      reqUrl = '/products/' + id + '/?deleted_at=';
    } else {
      reqUrl = '/products/?deleted_at=';
    }
    return this.request.get(reqUrl);
   }

   public getFavoriteProduct() {
    return this.request.get('/favorites');
   }

   public getProductByUser(user_id) {
    return this.request.get('/products/?deleted_at=&user_id=' + user_id);
   }

   public createProduct(body) {
    return this.request.post('/create-product', body);
   }

   public buyProduct(user_id, product_id) {
    const body = {bought_by: user_id};
    return this.request.patch('/products/' + product_id, JSON.stringify(body));
   }

   public deleteProductById(product_id) {
    return this.request.delete('/products/' + product_id);
   }
}

