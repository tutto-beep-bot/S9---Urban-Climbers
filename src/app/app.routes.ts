import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Home } from './features/posts/home/home';
import { Register } from './features/register/register';
import { PostFeed } from './features/posts/post-feed/post-feed';
import { authGuard } from './core/auth/auth-guard'; 
import { AddEditPost } from './features/posts/add-edit-post/add-edit-post';
import { guestGuard } from './core/auth/guest-guard';
import { About } from './shared/ui/about/about';
import { PostView } from './features/posts/post-view/post-view';

export const routes: Routes = [
    { path: '', component: PostFeed },
    { path: 'login', component: Login, canActivate: [guestGuard] }, 
    { path: 'register', component: Register, canActivate: [guestGuard] },
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'posts/new', component: AddEditPost, canActivate: [authGuard] }, 
    { path: 'posts/:id/edit', component: AddEditPost, canActivate: [authGuard] },
    { path: 'posts/:id', component: PostView },
    { path: 'about', component: About },  
    { path: '**', redirectTo: 'posts' }
];
