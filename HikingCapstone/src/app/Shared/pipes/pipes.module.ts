import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarRoundingPipe} from "../star-rounding.pipe";

@NgModule({
  declarations: [StarRoundingPipe],
  imports: [
    CommonModule
  ],
  exports: [
      StarRoundingPipe
  ]
})
export class PipesModule { }
