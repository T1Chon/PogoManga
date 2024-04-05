import { Routes } from '@angular/router';
import path from 'path';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MainComponent } from './components/main/main.component';

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
    }

    
];
