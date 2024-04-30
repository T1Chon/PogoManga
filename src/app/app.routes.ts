import { Routes } from '@angular/router';
import path from 'path';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MainComponent } from './components/main/main.component';
<<<<<<< HEAD
import { ShopLocationComponent } from './components/shop-location/shop-location.component';
import { ContactComponent } from './components/contact/contact.component';
=======
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
>>>>>>> 74aca3f5f58ca9bf8d5419b64b857d92e5da583a

export const  routes: Routes = [
    {
        path: 'main',
        component: MainComponent, 
    },
    {//Other route that no exist
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    {
        path: 'productdetail/:id', component: ProductDetailComponent
    },
<<<<<<< HEAD
    {
        path: 'shop', component: ShopLocationComponent
    },
    {
        path: 'contact', component: ContactComponent
=======
    {//Redirect to login
        path: 'login',
        component: LoginComponent,
    },
    {//Redirect to register
        path: 'register',
        component: RegisterComponent
>>>>>>> 74aca3f5f58ca9bf8d5419b64b857d92e5da583a
    }
];
