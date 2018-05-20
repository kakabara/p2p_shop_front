import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {ProductsListComponent} from './products-list/products-list.component';
import { WidgetLastCommentaryComponent } from './widget-last-commentary/widget-last-commentary.component';
import {ProductsService} from './services/products.service';
import {BaseRequests} from './services/base.requests';
import { HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from './product-page/product-page.component';
import { MainPageComponent } from './main-page/main-page.component';



const routes: Routes = [
  {
    path: '', component: MainPageComponent,
    children: [
      {
        path: 'products', component: ProductsListComponent
      },
      {
        path: 'registration', component: RegistrationComponent
      },
      {
        path: 'product/:product_id', component: ProductPageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductsListComponent,
    WidgetLastCommentaryComponent,
    LayoutComponent,
    RegistrationComponent,
    ProductPageComponent,
    MainPageComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductsService,
    BaseRequests,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
