import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  template: `
    <div class="row mt-4 col-12">
      <div class="col-10">
        <app-products-list></app-products-list>
      </div>
      <div class="col-2">
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
