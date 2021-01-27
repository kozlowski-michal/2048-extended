import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameKeys, Tile, TileType, } from '../data/structures';
import { findMoveLength, makeArray, makeMatrix, prepareMatrix, unprepareMatrix } from '../data/matrixFunctions';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() {}

  matrixDimension: number = 4;
  boardState = Array<Tile>(this.matrixDimension ** 2);
  boardStateSubject: BehaviorSubject<Tile[]> = new BehaviorSubject(this.boardState);

  firstRun(): void {
    this.boardState.fill(null);
    this.drawNewTile();
  }

  /*** Add new tile to board ***/
  drawNewTile(): boolean { // <------------------ rozbudowa
    let newTile: Tile = {
      type: TileType.normal,
      value: 2,
      moved: false,
      bonus: 0,
      turn: 0,
    };

    /*** Draw new, free field and add new tile to it ***/
    let indexesOfNullTiles: Array<number> = [];
    this.boardState.forEach( (item, index) => {
      if (item === null) indexesOfNullTiles.push(index) 
    });
    if (indexesOfNullTiles.length === 0) {
      return false;
    }
    else {
      let newTileOrder: number = Math.floor(Math.random() * indexesOfNullTiles.length); // range 0 - (n-1)
      let newTileIndex = indexesOfNullTiles[newTileOrder];
      this.boardState[newTileIndex] = newTile;
      return true;
    }
  }

  move(keyName: GameKeys): void {
    /*** clearing move flag for each item in array and adding one turn to how long tile lasts ***/
    this.boardState.map( (item) => {
      if (item !== null) {
        item.moved = false;
        item.turn++;
      }
    });

    /*** Matrix is made from array of tiles ***/
    let boardStateMatrix = makeMatrix(this.boardState, this.matrixDimension);

    /*** Matrix is fited to direction of move             ***/
    /*** because move is always made in one direction     ***/
    /*** so matrix have to be rotated to exact direction  ***/
    boardStateMatrix = prepareMatrix(boardStateMatrix, keyName);

 
    /*** Moving ***/
    boardStateMatrix.map( (row, rowIndex) => {
      row.map( (item, columnIndex) => {
        if (item != null) {
          /*** looking for how long can tile move, before it reaches end of board or another tile ***/
          let possibleMove: number = findMoveLength(boardStateMatrix, rowIndex, columnIndex);
          let targetTile: Tile = boardStateMatrix[rowIndex - possibleMove][columnIndex];
          if (possibleMove) {
            /*** Move to field with tile ***/
            if (targetTile !== null) {
              targetTile.value *= 2;
              targetTile.moved = true;
            }
            /*** Move to empty field ***/
            if (targetTile === null) {
              boardStateMatrix[rowIndex - possibleMove][columnIndex] = item;
            }
            /*** Clearing old position of tile ***/
            boardStateMatrix[rowIndex][columnIndex] = null;
          }
        }
      })
    })
        
    /*** Matrix is reverted to original direction and then to array ***/
    boardStateMatrix = unprepareMatrix(boardStateMatrix, keyName);
    this.boardState = makeArray(boardStateMatrix);

    /*** emiting actual state of baord ***/
    this.boardStateSubject.next(this.boardState);
  }

}
