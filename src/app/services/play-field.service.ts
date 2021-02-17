import {Injectable} from '@angular/core';
import {PlayFieldPlace} from '../model/play-field-place';
import {Pawn} from '../model/pawn/pawn';
import {Color} from '../model/pawn/color.enum';

@Injectable({
  providedIn: 'root'
})
export class PlayFieldService {
  playFieldPlaces: PlayFieldPlace[];

  constructor() {
    this.playFieldPlaces = this.generateNewPlayField();
  }

  generateNewPlayField(): PlayFieldPlace[] {
    const arrayToCreate: PlayFieldPlace[] = new Array(40);
    for (let i = 0; i < arrayToCreate.length; i++) {
      arrayToCreate[i] = new PlayFieldPlace(i);
    }
    return arrayToCreate;
  }

  initiate(): void {
    this.playFieldPlaces[0].pawnOnPlace = new Pawn(Color.RED);
  }

  movePawnOn(pawnOn: number, dice: number): void {
    this.playFieldPlaces[pawnOn + dice].pawnOnPlace = this.playFieldPlaces[pawnOn].pawnOnPlace;
    this.playFieldPlaces[pawnOn].pawnOnPlace = undefined;
  }
}
