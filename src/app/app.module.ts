import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserInterfaceModule } from './user-interface/user-interface.module';
import { BoardModule } from './board/board.module';
import { HighscoresModule } from './highscores/highscores.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UserInterfaceModule,
    BoardModule,
    HighscoresModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
