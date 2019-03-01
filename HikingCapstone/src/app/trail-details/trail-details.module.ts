import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrailDetailsPage } from './trail-details.page';
import {PipesModule} from "../Shared/pipes/pipes.module";

const routes: Routes = [
  {
    path: '',
    component: TrailDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrailDetailsPage]
})
export class TrailDetailsPageModule {}
