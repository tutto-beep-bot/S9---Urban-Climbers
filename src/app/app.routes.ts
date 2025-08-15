import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Home } from './features/posts/home/home';
import { Register } from './features/register/register';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login }, 
    { path: 'register', component: Register },
];
