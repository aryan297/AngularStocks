import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs';
import { componentFactoryName } from '@angular/compiler';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [{path:'' ,component:LoginComponent},
{ path:'register',component:RegisterComponent},
{ path: 'manage', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule) }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
