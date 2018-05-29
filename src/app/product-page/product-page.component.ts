import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {ProductModel} from '../models/product-model';
import {CommentariesService} from '../services/commentaries.service';
import {CommentaryModel} from '../models/commentary-model';
import {BaseRequests} from '../services/base.requests';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  template: `
    <div *ngIf="this.product" class="col-sm-12 mb-4">
      <div style="display: flex; justify-content: center; align-items: center;">
        <div class="card mt-5" style="width: 30rem;">
          <h5 class="card-title mt-1 ml-1 col-8">Товар: {{product.name}}</h5>
          <img class="card-img-top" src="http://127.0.0.1:5000/images/{{product.image_hash}}" alt="Card image cap">
          <div class="card-body">
            <button *ngIf="getUserId() && !product.bought_by"
                    (click)="buyProduct()" type="button" class="btn btn-outline-success mb-2 mr-2">
              Купить
            </button>
            <button *ngIf="!isFavorite" (click)="addToFavorite()" type="button" class="btn btn-outline-warning mb-2">
              Давить в избранное
            </button>
            <button *ngIf="isFavorite" (click)="removeFromFavorite()" type="button" class="btn btn-outline-warning mb-2">
              Удалить из избранного
            </button>
            <p class="card-text border-bottom">Цена: {{product.price}}</p>
            <p class="card-text border-bottom">Описание: {{product.description}}</p>
            <p *ngIf="showNumberForOwner()" class="card-text border-dark border-bottom">Номер покупателя: {{product.buyer.phone}}</p>
            <p *ngIf="showNumberForBuyer()" class="card-text border-dark border-bottom">Номер продавца: {{product.user.phone}}</p>
            <button *ngIf="showDelete()" (click)="deleteProduct()" type="button" class="btn btn-outline-danger float-right col-12">
              Удалить
            </button>
          </div>
        </div>
      </div>
      <div class="bg-light mt-3 col-12 ml-0 mr-0 rounded">
        <div class="form-group" *ngIf="isLogged()">
          <label class="border-bottom ml-1 mt-1" for="exampleFormControlTextarea1">Оставить вопрос</label>
          <textarea [(ngModel)]="textQuestion" class="form-control col-11" id="exampleFormControlTextarea1" rows="3"></textarea>
          <button type="button" (click)="createQuestion()" class="btn btn-success mb-4 mt-1">Задать</button>
        </div>
      </div>
      <div *ngIf="commentaries" class="mt-5 col-xs-3">
        <app-commentary-answer class="mb-1" *ngFor="let comment of commentaries" [comment]="comment">
        </app-commentary-answer>
      </div>
    </div>
  `,
})
export class ProductPageComponent implements OnInit {
  protected textQuestion: string;
  protected product: ProductModel;
  protected commentaries: CommentaryModel;
  protected isFavorite: boolean;
  protected favoriteId: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService,
              private commentService: CommentariesService,
              private requset: BaseRequests) { }

  ngOnInit() {
    const product_id = this.route.snapshot.params.product_id;
    this.productService.getProductById(product_id).subscribe((product: ProductModel) => {
      this.product = product;
      this.requset.get('/favorites/?user_id=' + this.getUserId() + '&product_id=' + this.product.id)
        .subscribe( (data) => {
          this.isFavorite = true;
          this.favoriteId = data[0]['id'];
          }
        , () => this.isFavorite = false);
    });
    this.commentService.getCommentariesByProductId(product_id).subscribe( commentaries => this.commentaries = commentaries);

  }

  private isLogged() {
    return localStorage.getItem('authToken');
  }

  private showNumberForBuyer() {
    console.log('for buyer', this.product.bought_by ? this.product.bought_by === +this.getUserId() : false);
    return this.product.bought_by ? this.product.buyer.id === +this.getUserId() : false;
  }

  private showNumberForOwner() {
    console.log('for owner', this.product.bought_by ? this.product.user_id === this.getUserId() : false);
    return this.product.bought_by ? this.product.user_id === +this.getUserId() : false;
  }

  private createQuestion() {
    if (this.textQuestion) {
      const question = {
        text: this.textQuestion,
        product_id: this.product.id,
        user_id: localStorage.getItem('user_id')
      };
      this.commentService.create(question).subscribe(result => console.log(result));
    }
  }

  private getUserId() {
    return localStorage.getItem('user_id');
  }

  private buyProduct() {
    this.productService.buyProduct(this.getUserId(), this.product.id).subscribe( data => this.product = data);
  }

  private showDelete() {
    return this.product.user_id === +this.getUserId();
  }

  private deleteProduct() {
    this.productService.deleteProductById(this.product.id).subscribe( result => {
      this.router.navigate(['/your-product']);
      // alert('Товар успешно удален');
    });
  }

  private addToFavorite() {
    const newFavorite = {
      product_id : this.product.id,
      user_id: this.getUserId()
    };
    this.requset.post('/favorites/', JSON.stringify(newFavorite))
      .subscribe((data) => {
        this.isFavorite = true;
        this.favoriteId = data['id'];
      });
  }

  private removeFromFavorite() {
    this.requset.delete('/favorites/' + this.favoriteId).subscribe(() => {
      this.isFavorite = false;
      this.favoriteId = undefined;
    });
  }
}

