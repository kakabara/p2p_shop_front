import { Injectable } from '@angular/core';
import {BaseRequests} from './base.requests';


@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private request: BaseRequests) { }

  public createAnswer(body) {
    console.log(body);
    return this.request.post('/answers/', JSON.stringify(body));
  }
}
