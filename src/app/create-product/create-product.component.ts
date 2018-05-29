import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../services/products.service';
import {BaseRequests} from '../services/base.requests';

@Component({
  selector: 'app-create-product',
  template: `
    <div *ngIf="getAuth()">
      <div class="col-sm-12">
        <div style="display: flex; justify-content: center; align-items: center;">
          <div class="card mt-5" style="width: 30rem;">
            <form enctype="multipart/form-data" [formGroup]="form" (submit)="submit()">
              <div class="form-group">
                <label for="formGroupExampleInput">Название</label>
                <input formControlName="name" type="text" class="form-control" id="formGroupExampleInput" placeholder="Название">
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Цена</label>
                <input formControlName="price" type="number" class="form-control" id="formGroupExampleInput2" placeholder="Цена">
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Описание</label>
                <input formControlName="description" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Описание">
              </div>
              <div class="form-group">
                <label for="files">Файл</label>
                <input id="files" type="file" (change)="onLoadFile($event.target.files)">
              </div>
              <input type="submit" value="Создать" class="btn btn-outline-success mt-3" [disabled]="form.invalid">
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  protected fileToUpload: any;
  protected formData: FormData = new FormData();
  protected form: FormGroup;
  protected src: string = '';
  constructor(private productService: ProductsService,
              private request: BaseRequests) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    });
  }
  public onLoadFile(file: FileList) {
    console.log(file);
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.src = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  private submit() {
    const  formData = new FormData();
    const data = this.form.value;
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('data', JSON.stringify(data));
    this.productService.createProduct(formData).subscribe( a => console.log(a));
  }

  private getAuth() {
    return localStorage.getItem('authToken');
  }
}
