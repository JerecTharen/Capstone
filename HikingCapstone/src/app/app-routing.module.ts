import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./Services/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trail-search',
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
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'my-trails', loadChildren: './my-trails/my-trails.module#MyTrailsPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
