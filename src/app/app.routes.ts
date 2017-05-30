import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { WorkComponent } from './work/work.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: 'blog', component: BlogComponent },
    { path: 'blog/:slug', component: BlogComponent },
    { path: 'portfolio', component: WorkComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', component: HomeComponent }
];
