import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarRoundingPipe} from "../star-rounding.pipe";
import { DifficultyPipe } from '../../Shared/pipes/difficulty.pipe';

@NgModule({
  declarations: [
      StarRoundingPipe,
    DifficultyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
      StarRoundingPipe,
      DifficultyPipe
  ]
})
export class PipesModule { }
