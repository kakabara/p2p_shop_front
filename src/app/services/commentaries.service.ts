import { Injectable } from '@angular/core';
import {BaseRequests} from './base.requests';

@Injectable({
  providedIn: 'root'
})
export class CommentariesService {

  constructor(private request: BaseRequests) { }

  public create(data) {
    return this.request.post('/commentaries/', JSON.stringify(data));
  }
  public getLatestCommentaries() {
    return this.request.get('/commentaries/');
  }
  public getCommentariesByProductId(product_id) {
    return this.request.get('/commentaries/?product_id=' + product_id);
  }

  public update(comment_id, body) {
    return this.request.patch('/commentaries/' + comment_id, JSON.stringify(body));
  }
}
