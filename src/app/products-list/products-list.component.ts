import {Component, OnInit} from '@angular/core';
import {BaseRequests} from '../services/base.requests';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-products-list',
  template: `
    <div class="row ml-1">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src=".../100px180/" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  `
})

export class ProductsListComponent implements OnInit {

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.service.getProductByUserId(1);
  }
}
