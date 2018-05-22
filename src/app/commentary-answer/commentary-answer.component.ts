import {Component, Input, OnInit} from '@angular/core';
import {CommentaryModel} from '../models/commentary-model';
import {UserModel} from '../models/user-model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-commentary-answer',
  template: `
    <a routerLink="/product/{{comment.product_id}}" class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{comment.product.name}}</h5>
        <small>{{comment.created_at}}</small>
      </div>
      <p class="mb-1">{{comment.text}}</p>
      <small>Вопрос от: {{comment.user.login}}</small>
      <div *ngIf="hasAnswer()" class="col-sm-12 alert alert-secondary">
        <div  class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{comment.answer.text}}</h5>
        </div>
        <small>Ответ от: {{comment.answer.user.login}}</small>
      </div>
    </a>
    <div *ngIf="showAnswerForm()">
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Example textarea</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button type="button" class="btn btn-success">Success</button>
    </div>
  `,
  styleUrls: ['./commentary-answer.component.css']
})
export class CommentaryAnswerComponent implements OnInit {
  @Input() comment: CommentaryModel;
  constructor() { }

  ngOnInit() {
  }

  private userIsOwner() {
      return localStorage.getItem('user_id') === this.comment.product.user_id;
  }

  private showAnswerForm() {
    return this.userIsOwner() && !this.hasAnswer();
  }

  private hasAnswer() {
    return this.comment['answer']['text'];
  }

}
