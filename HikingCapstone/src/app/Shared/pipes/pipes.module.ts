import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarRoundingPipe} from "../star-rounding.pipe";
import { DifficultyPipe } from './difficulty.pipe';
import { WDescPipe } from './w-desc.pipe';
import { UnknownImgPipe } from './unknown-img.pipe';

@NgModule({
  declarations: [
    StarRoundingPipe,
    DifficultyPipe,
    WDescPipe,
    UnknownImgPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
      StarRoundingPipe,
      DifficultyPipe,
      WDescPipe,
      UnknownImgPipe
  ]
})
export class PipesModule { }
