import { Component, OnInit } from '@angular/core';
import {CommentaryModel} from '../models/commentary-model';
import {CommentariesService} from '../services/commentaries.service';
import {ProductsService} from '../services/products.service';
import {ProductModel} from '../models/product-model';

@Component({
  selector: 'app-widget-last-commentary',
  template: `
    <div class="list-group">
      <p>Последнии комментарии:</p>
      <a *ngFor="let comment of commentaries" routerLink="/product/{{comment.product_id}}"
         class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{comment.product.name}}</h5>
          <small>{{comment.created_at}}</small>
        </div>
        <p class="mb-1">{{comment.text}}</p>
        <small>asdasdadsd</small>
      </a>
    </div>
  `,
  styleUrls: ['./widget-last-commentary.component.css']
})
export class WidgetLastCommentaryComponent implements OnInit {
  commentaries: [CommentaryModel];
  constructor(private commentariesService: CommentariesService) { }

  ngOnInit() {
    this.commentariesService.getLatestCommentaries().subscribe((commentaries: [CommentaryModel]) => this.commentaries = commentaries);
  }

  private getProduct(product_id) {
  }

}
