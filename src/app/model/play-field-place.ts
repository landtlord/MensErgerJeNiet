import {Pawn} from './pawn/pawn';

export class PlayFieldPlace {
  placeNumber: number;

  pawnOnPlace: Pawn | undefined;

  constructor(placeNumber: number) {
    this.placeNumber = placeNumber;
  }
}
