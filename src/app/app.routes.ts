import { Routes } from '@angular/router';
import path from 'path';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

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
    {//Redirect to login
        path: 'login',
        component: LoginComponent,
    },
    {//Redirect to register
        path: 'register',
        component: RegisterComponent
    }
];
