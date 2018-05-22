import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {ProductModel} from '../models/product-model';

@Component({
  selector: 'app-product-page',
  template: `
    <div class="col-sm-12">
      <div style="display: flex; justify-content: center; align-items: center;">
        <div class="card mt-5" style="width: 30rem;">
          <h5 class="card-title">{{product.name}}</h5>
          <img class="card-img-top" src="http://127.0.0.1:5000/images/{{product.image_hash}}" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">Цена: {{product.price}}</p>
            <p class="card-text">Описание {{product.description}}</p>
          </div>
        </div>
        </div>
    </div>
  `,
})
export class ProductPageComponent implements OnInit {
  protected product: ProductModel;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService) { }

  ngOnInit() {
    const product_id = this.route.snapshot.params.product_id;
    this.productService.getProductById(product_id).subscribe((product: ProductModel) => this.product = product);
  }
}
