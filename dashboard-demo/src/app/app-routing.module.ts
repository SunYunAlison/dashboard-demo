import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSumComponent } from './dashboard-sum/dashboard-sum.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardSumComponent,loadChildren:()=> import('src/app/dashboard-sum/dashboard-sum.module').then(x=>x.DashboardSumModule) },
  { path: 'page', component: DashboardComponent,loadChildren:()=> import('src/app/dashboard/dashboard.module').then(x=>x.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})


export class AppRoutingModule { }
