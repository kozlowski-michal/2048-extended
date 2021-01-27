import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighscoresComponent } from './highscores.component';

@NgModule({
  declarations: [    
    HighscoresComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HighscoresComponent,
  ]
})
export class HighscoresModule { }
