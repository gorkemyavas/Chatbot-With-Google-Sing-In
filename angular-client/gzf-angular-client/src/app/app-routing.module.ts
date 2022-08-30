import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }         from './app.component';
import { LoginComponent }       from './login/login.component';
import { HomeComponent }        from './home/home.component';
import { IsLoginGuard }         from './guards/is-login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [IsLoginGuard]
  },
  {
    path:'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
