import {Injectable} from '@angular/core';
import {PlayFieldPlace} from '../model/play-field-place';
import {Pawn} from '../model/pawn/pawn';
import {Color} from '../model/pawn/color.enum';

@Injectable({
  providedIn: 'root'
})
export class PlayFieldService {
  playFieldPlaces: PlayFieldPlace[];
  redHome: PlayFieldPlace[];
  blueHome: PlayFieldPlace[];
  greenHome: PlayFieldPlace[];
  yellowHome: PlayFieldPlace[];
  redRemainingPawn: number;
  blueRemainingPawn: number;
  greenRemainingPawn: number;
  yellowRemainingPawn: number;

  constructor() {
    this.playFieldPlaces = this.generateNewPlayField(40);
    this.redHome = this.generateNewPlayField(4);
    this.blueHome = this.generateNewPlayField(4);
    this.greenHome = this.generateNewPlayField(4);
    this.yellowHome = this.generateNewPlayField(4);
    this.redRemainingPawn = 4;
    this.blueRemainingPawn = 4;
    this.greenRemainingPawn = 4;
    this.yellowRemainingPawn = 4;
  }

  generateNewPlayField(numberOfPlaces: number): PlayFieldPlace[] {
    const arrayToCreate: PlayFieldPlace[] = new Array(numberOfPlaces);
    for (let i = 0; i < arrayToCreate.length; i++) {
      arrayToCreate[i] = new PlayFieldPlace(i);
    }
    return arrayToCreate;
  }

  initiate(): void {
    this.playFieldPlaces[0].pawnOnPlace = new Pawn(Color.RED);
  }

  movePawnOn(pawnOn: number, dice: number): void {
    this.playFieldPlaces[(pawnOn + dice) % 40].pawnOnPlace = this.playFieldPlaces[pawnOn].pawnOnPlace;
    this.playFieldPlaces[pawnOn].pawnOnPlace = undefined;
  }
}
