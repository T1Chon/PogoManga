import { Routes } from '@angular/router';
import path from 'path';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MainComponent } from './components/main/main.component';
import { ShopLocationComponent } from './components/shop-location/shop-location.component';
import { ContactComponent } from './components/contact/contact.component';

export const  routes: Routes = [
    {
        path: 'main',
        component: MainComponent, 
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    {
        path: 'productdetail/:id', component: ProductDetailComponent
    },
    {
        path: 'shop', component: ShopLocationComponent
    },
    {
        path: 'contact', component: ContactComponent
    }

    
];
