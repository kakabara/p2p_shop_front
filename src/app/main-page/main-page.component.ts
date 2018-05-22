import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  template: `
    <div class="row mt-4 ml-4">
      <div class="col-sm-8">
        <app-products-list></app-products-list>
      </div>
      <div class="col-sm-3">
        <app-widget-last-commentary></app-widget-last-commentary>
      </div>
    </div>
  `,
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
