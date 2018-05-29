import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {ProductModel} from '../models/product-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-list',
  template: `
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li (click)="prevPage()" class="page-item">
            <a class="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li *ngFor="let in of counter(countPages); let i=index" (click)="setPage(i+1)" class="page-item">
            <a class="page-link">{{i +1}}</a>
          </li>
          <li (click)="nextPage()" class="page-item">
            <a class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="row col-11 ml-3 mt-4">
        <div *ngFor="let product of products" class="card mt-3 mr-3">
          <img class="card-img-top" style="max-width: 300px; max-height: 300px;"
               src="http://127.0.0.1:5000/images/{{product.image_hash}}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">{{product.description}}</p>
            <a routerLink="/product/{{product.id}}" class="btn btn-primary">Посмотреть товар</a>
            <button *ngIf="getUserId()" (click)="buyProduct(product.id)" type="button" class="btn btn-outline-success ml-4">Купить</button>
          </div>
        </div>
      </div>

  `
})

export class ProductsListComponent implements OnInit {
  protected products: ProductModel[];
  protected allProducts: ProductModel[];
  protected productsOnPage = 10;
  protected countPages = 1;
  protected currentPage = 1;
  constructor(private service: ProductsService,
              private router: Router
              ) {}

  ngOnInit() {
    if (this.router.isActive('products', true) || this.router.isActive('favorites', true)) {
      this.productsOnPage = 10;
    }

    if (this.router.isActive('favorites', true)) {
      this.service.getFavoriteProduct().subscribe((products: [ProductModel]) => {
        this.allProducts = products;
        this.countPages = Math.ceil(this.allProducts.length / this.productsOnPage);
        this.getSliceProduct();
        console.log(this.products);
      });

    }
    if (this.router.isActive('products', true) || this.router.isActive('', true)) {

      this.service.getAllProducts().subscribe((products: [ProductModel]) => {
        this.allProducts = products;
        this.countPages = Math.ceil(this.allProducts.length / this.productsOnPage);
        this.getSliceProduct();
      });
    }
    if (this.router.isActive('your-products', true)) {
      const user_id = localStorage.getItem('user_id');
      this.service.getProductByUser(user_id).subscribe((products: [ProductModel]) => {
        console.log(products);
        this.allProducts = products;
        this.countPages = Math.ceil(this.allProducts.length / this.productsOnPage);
        this.getSliceProduct();
      });
    }
  }

  protected counter(i) {
    return Array(i);
  }

  protected setPage(pageNumber) {
    this.currentPage = pageNumber;
    this.getSliceProduct();
  }

  protected nextPage() {
    if (this.currentPage + 1 <= this.countPages) {
      this.currentPage = this.currentPage + 1;
      this.getSliceProduct();
    }
  }

  protected prevPage() {
    if (this.currentPage - 1 >= 1) {
      this.currentPage = this.currentPage - 1;
      this.getSliceProduct();
    }
  }

  protected getSliceProduct() {
    this.products = this.allProducts.slice((this.currentPage - 1) * this.productsOnPage, this.currentPage * this.productsOnPage);
  }

  private getUserId() {
    return localStorage.getItem('user_id');
  }

  private buyProduct(product_id) {
    this.service.buyProduct(this.getUserId(), product_id).subscribe( data => this.router.navigate(['products', data['id']]));
  }
}
