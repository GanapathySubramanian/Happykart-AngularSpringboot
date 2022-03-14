import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProductService } from './services/product.service';

import {Routes, RouterModule, Router} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthIntercepterService } from './services/auth-intercepter.service';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth,injector: { get: (arg0: any) => any; }) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path:'members',component:MembersPageComponent,canActivate:[OktaAuthGuard]},
  {path:'order-history',component:OrderHistoryComponent,canActivate:[OktaAuthGuard]},
  {
    path:'checkout',component:CheckoutComponent
  },
  {
    path:'card-details',component:CardDetailsComponent
  },

  {
    path:'products/:id',component:ProductDetailsComponent
  },
  {
    path:'search/:keyword',component:ProductListComponent
  },
  {
    path:'category/:id',component:ProductListComponent
  },
  {
    path:'category',component:ProductListComponent
  },
  {
    path:'products',component:ProductListComponent
  },
  {
    path:'',redirectTo:'/products',pathMatch:'full'
  },
  {
    path:'**',redirectTo:'/products',pathMatch:'full'
  }
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CardDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: oktaConfig },
              {provide:HTTP_INTERCEPTORS,useClass:AuthIntercepterService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
