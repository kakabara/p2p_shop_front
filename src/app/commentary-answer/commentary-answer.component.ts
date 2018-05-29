import {Component, Input, OnInit} from '@angular/core';
import {CommentaryModel} from '../models/commentary-model';
import {UserModel} from '../models/user-model';
import {AuthService} from '../services/auth.service';
import {AnswerService} from '../services/answer.service';
import {CommentariesService} from '../services/commentaries.service';

@Component({
  selector: 'app-commentary-answer',
  template: `
    <a *ngIf="comment" routerLink="/product/{{comment.product_id}}"
       class="list-group-item list-group-item-action flex-column align-items-start">
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
    <div *ngIf="showAnswerForm()" class="mb-4">
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Ответить на вопрос</label>
        <textarea [(ngModel)]="answerText" class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
      </div>
      <button type="button" (click)="createAnswer()" class="btn btn-success">Ответить</button>
    </div>
  `,
  styleUrls: ['./commentary-answer.component.css']
})
export class CommentaryAnswerComponent implements OnInit {
  @Input() comment: CommentaryModel;
  protected answerText: string;
  constructor(private answerService: AnswerService,
              private commentaryService: CommentariesService) { }

  ngOnInit() {
  }

  private userIsOwner() {
      return +localStorage.getItem('user_id') === this.comment.product.user_id;
  }

  private showAnswerForm() {
    return this.userIsOwner() && !this.hasAnswer();
  }

  private hasAnswer() {
    return this.comment['answer']['text'];
  }

  private createAnswer() {
    const body = {
      user_id: +localStorage.getItem('user_id'),
      text: this.answerText
    };

    this.answerService.createAnswer(body).subscribe( answer => {
      this.comment.answer_id = answer['id'];
      this.commentaryService.update(this.comment.id, {answer_id: answer['id']}).subscribe(comment => {
        this.comment = comment;
      });

    });
  }

}
