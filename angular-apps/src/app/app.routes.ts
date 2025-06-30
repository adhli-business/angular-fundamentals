import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AddCreditur } from './pages/add-creditur/add-creditur';
import { DetailCreditur } from './pages/detail-creditur/detail-creditur';
import { AuthGuard } from './shared/auth/auth.guard';
import { Login } from './pages/login/login/login';

export const routes: Routes = [
    // path buat ngelihat seluruh data table
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home, canActivate:[AuthGuard]},

    // path buat nambah data
    {path: 'add-creditur', component: AddCreditur},

    //path buat ngelihat detail creditur
    {path: 'detail-creditur/:id', component: DetailCreditur},

    // path buat halaman login
    {path: 'login', component: Login},


    // {path: 'home', component: HomeComponent},
    // {path: 'about-us', component: AboutUsComponent},
    // {path: 'creditur/:id', component: DetailCrediturComponent}
    // {path: '404', component: NotFoundComponent},
    // {path: '**', redirectTo: '404'},
    // {path: ':id', component: DetailCrediturComponent} yang ada titik 2 harus selalu dibawah karena dinamis bukan statis
    // {path: ':creditur/:id', component: DetailCrediturComponent} 
];
