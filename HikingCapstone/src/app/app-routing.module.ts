import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./Services/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'trail-search',
    loadChildren: './trail-search/trail-search.module#TrailSearchPageModule',
    // canActivate: [AuthGuard]
  },
  { path: 'trail-details/:id',
    loadChildren: './trail-details/trail-details.module#TrailDetailsPageModule',
    // canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
