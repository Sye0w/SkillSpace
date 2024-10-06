import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
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
      {
        path: 'login',
        component: LoginComponent,
        children:[
          {
            path: '',
            component: LoginFormComponent
          },
          {
            path: 'forgot-password',
            loadComponent: () => import('./components/forgot-password/forgot-password.component')
             .then(m => m.ForgotPasswordComponent)
          }
        ]
      },
      {
        path: 'register',
        loadComponent:()=> import('./views/auth/register/register.component')
        .then(m => m.RegisterComponent)
      }
    ]
  }
];
