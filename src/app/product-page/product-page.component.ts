import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {ProductModel} from '../models/product-model';
import {CommentariesService} from '../services/commentaries.service';
import {CommentaryModel} from '../models/commentary-model';

@Component({
  selector: 'app-product-page',
  template: `
    <div *ngIf="this.product" class="col-sm-12">
      <div style="display: flex; justify-content: center; align-items: center;">
        <div class="card mt-5" style="width: 30rem;">
          <h5 class="card-title">{{product.name}}</h5>
          <img class="card-img-top" src="http://127.0.0.1:5000/images/{{product.image_hash}}" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">Цена: {{product.price}}</p>
            <p class="card-text">Описание {{product.description}}</p>

            <p class="card-text">Номер покупателя {{product.buyer.phone}}</p>
            <p class="card-text">Номер продавца {{product.user.phone}}</p>
          </div>
        </div>
        </div>
      <div *ngIf="isLogged()">
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Оставить вопрос</label>
          <textarea [(ngModel)]="textQuestion" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type="button" (click)="createQuestion()" class="btn btn-success">Success</button>
      </div>
      <div *ngIf="commentaries" class="mt-5 col-xs-3">
        <app-commentary-answer  class="mb-1" *ngFor="let comment of commentaries" [comment]="comment">
        </app-commentary-answer>
      </div>
    </div>
  `,
})
export class ProductPageComponent implements OnInit {
  protected textQuestion: string;
  protected product: ProductModel;
  protected commentaries: CommentaryModel;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService,
              private commentService: CommentariesService) { }

  ngOnInit() {
    const product_id = this.route.snapshot.params.product_id;
    this.productService.getProductById(product_id).subscribe((product: ProductModel) => this.product = product);
    this.commentService.getCommentariesByProductId(product_id).subscribe( commentaries => this.commentaries = commentaries);
  }

  private isLogged() {
    return localStorage.getItem('authToken');
  }

  private showNumberForBuyer() {

  }

  private showNumberForOwner() {

  }

  private createQuestion() {
    const question = {
      text: this.textQuestion,
      product_id: this.product.id,
      user_id: localStorage.getItem('user_id')
    };
    this.commentService.create(question).subscribe( result => console.log(result));
  }
}
