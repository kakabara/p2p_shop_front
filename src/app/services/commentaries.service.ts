import { Injectable } from '@angular/core';
import {BaseRequests} from './base.requests';

@Injectable({
  providedIn: 'root'
})
export class CommentariesService {

  constructor(private request: BaseRequests) { }

  public getLatestCommentaries() {
    return this.request.get('/commentaries/');
  }
  public getCommentariesByProductId(product_id) {
    return this.request.get('/commentaries/' + product_id);
  }
}
