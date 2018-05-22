import { Component, OnInit } from '@angular/core';
import {CommentaryModel} from '../models/commentary-model';
import {CommentariesService} from '../services/commentaries.service';
@Component({
  selector: 'app-widget-last-commentary',
  template: `
    <div class="list-group mr-0">
      <p>Последнии комментарии:</p>
      <app-commentary-answer *ngFor="let comment of commentaries" [comment]="comment">
      </app-commentary-answer>
    </div>
  `,
  styleUrls: ['./widget-last-commentary.component.css']
})
export class WidgetLastCommentaryComponent implements OnInit {
  commentaries: [CommentaryModel];
  constructor(private commentariesService: CommentariesService) { }

  ngOnInit() {
    this.commentariesService.getLatestCommentaries()
      .subscribe((commentaries: [CommentaryModel]) => this.commentaries = commentaries);
  }
}
