import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() {
  }

  rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}
