import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {ProductModel} from '../models/product-model';

@Component({
  selector: 'app-products-list',
  template: `
    <div class="row ml-4 mt-4">
      <div *ngFor="let product of products" class="card mt-3 mr-3">
        <img class="card-img-top" src="http://127.0.0.1:5000/images/{{product.image_hash}}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <p class="card-text">{{product.description}}</p>
          <a routerLink="/product/{{product.id}}" class="btn btn-primary">Посмотреть товар</a>
        </div>
      </div>
    </div>
  `
})

export class ProductsListComponent implements OnInit {
  protected products: [ProductModel];
  constructor(private service: ProductsService,

              ) {}

  ngOnInit() {
    this.service.getProductById(null).subscribe( (products: [ProductModel]) => this.products = products);
  }

}
