import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AppComponent,
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'register',
        loadComponent:()=> import('./views/auth/register/register.component')
        .then(m => m.RegisterComponent)
      }
    ]
  }
];
