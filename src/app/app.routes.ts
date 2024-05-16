import { Routes } from '@angular/router';
import path from 'path';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MainComponent } from './components/main/main.component';
import { ShopLocationComponent } from './components/shop-location/shop-location.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FigurasComponent } from './components/figuras/figuras.component';


export const  routes: Routes = [
    {
        path: 'main', component: MainComponent, 
    },
    {//Other route that no exist
        path: '', redirectTo: '/main', pathMatch: 'full'
    },
    {
        path: 'productdetail/:id', component: ProductDetailComponent
    },
    {
        path: 'shop', component: ShopLocationComponent
    },
    {
        path: 'contact', component: ContactComponent
    },
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'figuras', component: FigurasComponent
    }
];
