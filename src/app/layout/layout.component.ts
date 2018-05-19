import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-top-bar></app-top-bar>
<router-outlet></router-outlet>
    <!--<div class="row mt-4 ml-4">-->
    <!--<div class="col-sm-8">-->
    <!--<app-products-list></app-products-list>-->
    <!--</div>-->
    <!--<div class="col-sm-4">-->
    <!--<app-widget-last-commentary></app-widget-last-commentary>-->
    <!--</div>-->
    <!--</div>-->
  `
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
