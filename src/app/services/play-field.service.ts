import {Injectable} from '@angular/core';
import {PlayFieldPlace} from '../model/play-field-place';
import {Pawn} from '../model/pawn/pawn';
import {Color} from '../model/pawn/color.enum';
import {Coordinate} from '../model/pawn/coordinate';

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

  coordinates: Coordinate[] = [
    new Coordinate(0, 4),
    new Coordinate(1, 4),
    new Coordinate(2, 4),
    new Coordinate(3, 4),
    new Coordinate(4, 4),
    new Coordinate(4, 3),
    new Coordinate(4, 2),
    new Coordinate(4, 1),
    new Coordinate(4, 0),
    new Coordinate(5, 0),
    new Coordinate(6, 0),
    new Coordinate(6, 1),
    new Coordinate(6, 2),
    new Coordinate(6, 3),
    new Coordinate(6, 4),
    new Coordinate(7, 4),
    new Coordinate(8, 4),
    new Coordinate(9, 4),
    new Coordinate(10, 4),
    new Coordinate(10, 5),
    new Coordinate(10, 6),
    new Coordinate(9, 6),
    new Coordinate(8, 6),
    new Coordinate(7, 6),
    new Coordinate(6, 6),
    new Coordinate(6, 7),
    new Coordinate(6, 8),
    new Coordinate(6, 9),
    new Coordinate(6, 10),
    new Coordinate(5, 10),
    new Coordinate(4, 10),
    new Coordinate(4, 9),
    new Coordinate(4, 8),
    new Coordinate(4, 7),
    new Coordinate(4, 6),
    new Coordinate(3, 6),
    new Coordinate(2, 6),
    new Coordinate(1, 6),
    new Coordinate(0, 6),
    new Coordinate(0, 5)
  ];

  constructor() {
    this.playFieldPlaces = this.generateNewPlayField(40);
    this.redHome = this.generateNewPlayField(4);
    this.blueHome = this.generateNewPlayField(4);
    this.greenHome = this.generateNewPlayField(4);
    this.yellowHome = this.generateNewPlayField(4);
    this.redRemainingPawn = 3;
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
    this.playFieldPlaces[0].pawnOnPlace = new Pawn(Color.YELLOW, new Coordinate(0, 4));
  }

  movePawnOn(pawnOn: number, dice: number): number {
    const newPlace = (pawnOn + dice) % 40;
    this.playFieldPlaces[newPlace].pawnOnPlace = this.playFieldPlaces[pawnOn].pawnOnPlace;
    // @ts-ignore
    this.playFieldPlaces[newPlace].pawnOnPlace.coordinate = this.mapPlaceOnFieldToCoordinate(newPlace);
    this.playFieldPlaces[pawnOn].pawnOnPlace = undefined;
    return newPlace;
  }

  getBoard(): Pawn[] {
    const pawns: Pawn[] = [];
    for (const item of this.playFieldPlaces) {
      if (item.pawnOnPlace !== undefined) {
        pawns.push(item.pawnOnPlace as Pawn);
      }
    }
    return pawns;
  }

  mapPlaceOnFieldToCoordinate(placeOnField: number): Coordinate {
    return this.coordinates[placeOnField];
  }
}
