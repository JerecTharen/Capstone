import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrailSearchPage } from './trail-search.page';
import {PipesModule} from "../Shared/pipes/pipes.module";

const routes: Routes = [
  {
    path: '',
    component: TrailSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [TrailSearchPage]
})
export class TrailSearchPageModule {}
