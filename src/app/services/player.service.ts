import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  experience: number = 0;
  lvl: number = 1;
  power: number = 0;

  constructor() { }
}
