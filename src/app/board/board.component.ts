import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Tile } from '../data/structures';
import { BoardService } from '../services/board.service';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';
import { GameState, GameKeys } from '../data/structures';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  gameState: Observable<number>;
  gameStateEnum: typeof GameState = GameState;
  boardState: Observable<Tile[]>;
  gameKey: GameKeys;

  constructor(
    private game: GameService,
    private player: PlayerService,
    private board: BoardService,
    ) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.gameKey = <GameKeys>event.key;
    if ( Object.values(GameKeys).includes(this.gameKey) ) {
      event.preventDefault();
      this.game.keyPressed(this.gameKey);
    }
  }

  ngOnInit(): void {
    this.gameState = this.game.gameStateSubject.asObservable();
    this.boardState = this.board.boardStateSubject.asObservable();
  };

  startByTouch(): void { // tak jakby początkowe naciśnięcie spacji
    //this.game.keyPressed(GameKeys.space);
  }




}
