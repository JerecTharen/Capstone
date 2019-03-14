import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarRoundingPipe} from "../star-rounding.pipe";
import { DifficultyPipe } from './difficulty.pipe';
import { WDescPipe } from './w-desc.pipe';

@NgModule({
  declarations: [
    StarRoundingPipe,
    DifficultyPipe,
    WDescPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
      StarRoundingPipe,
      DifficultyPipe,
      WDescPipe
  ]
})
export class PipesModule { }
