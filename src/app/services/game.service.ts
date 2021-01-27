import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerService } from './player.service';
import { BoardService } from './board.service';
import { GameKeys, GameState } from '../data/structures';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameState: GameState = GameState.beforeGame;
  gameStateSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.gameState);
  moveTime: number = 500;
  
  score: number = 0;
  constructor(private player: PlayerService, private board: BoardService) { }

  keyPressed(keyName: GameKeys): void {
    if (keyName == GameKeys.space) {
      if (this.gameState === GameState.beforeGame) this.run()
      else if (this.gameState === GameState.gameRunning) this.usePower()     
    }
    else { // arrow keys
      if (this.gameState === GameState.gameRunning) { // arrows works only when the game is running
        this.nextMove(keyName);
      }
    }
  }

  /*** First run of new game ***/
  run(): void {
    this.gameState = GameState.gameRunning; // run game if not yet running
    this.board.firstRun();
    this.gameStateSubject.next(this.gameState);
    console.log("Game started!");//<-------------------------------------------------------------------------------DEL
  }

  /*** Another step of game - single move ***/
  nextMove(keyName: GameKeys): void {
    if (this.gameState == GameState.gameRunning) {
      this.board.move(keyName);
      this.gameState = this.board.drawNewTile() ? GameState.gameRunning : GameState.gameOver;
      this.gameStateSubject.next(this.gameState);
      console.log("Next move! " + keyName);
    }
  }
  /*** Special power binded to space ***/
  usePower(): void {
    console.log("Power used!");//<-------------------------------------------------------------------------------DEL
  }
}
