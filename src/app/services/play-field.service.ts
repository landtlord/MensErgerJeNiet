import {Injectable} from '@angular/core';
import {Pawn} from '../model/pawn/pawn';
import {Color} from '../model/pawn/color.enum';
import {Coordinate} from '../model/pawn/coordinate';
import {Constants} from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class PlayFieldService {
  pawns: Pawn[] = [];

  constructor() {
  }

  initiate(): void {
    this.pawns.push(new Pawn(Color.RED, new Coordinate(0, 0)));
    this.pawns.push(new Pawn(Color.RED, new Coordinate(0, 1)));
    this.pawns.push(new Pawn(Color.RED, new Coordinate(1, 0)));
    this.pawns.push(new Pawn(Color.RED, new Coordinate(1, 1)));
    this.pawns.push(new Pawn(Color.BLEU, new Coordinate(9, 0)));
    this.pawns.push(new Pawn(Color.BLEU, new Coordinate(9, 1)));
    this.pawns.push(new Pawn(Color.BLEU, new Coordinate(10, 0)));
    this.pawns.push(new Pawn(Color.BLEU, new Coordinate(10, 1)));
    this.pawns.push(new Pawn(Color.GREEN, new Coordinate(9, 9)));
    this.pawns.push(new Pawn(Color.GREEN, new Coordinate(9, 10)));
    this.pawns.push(new Pawn(Color.GREEN, new Coordinate(10, 9)));
    this.pawns.push(new Pawn(Color.GREEN, new Coordinate(10, 10)));
    this.pawns.push(new Pawn(Color.YELLOW, new Coordinate(0, 9)));
    this.pawns.push(new Pawn(Color.YELLOW, new Coordinate(0, 10)));
    this.pawns.push(new Pawn(Color.YELLOW, new Coordinate(1, 9)));
    this.pawns.push(new Pawn(Color.YELLOW, new Coordinate(1, 10)));
  }

  movePawn(pawn: Pawn, dice: number): void {
    let index = Constants.COORDINATES.findIndex(coordinate => coordinate === pawn.coordinate);

    if (index === -1) {
      this.putOnBoard(pawn);
    } else {
      index = (index + dice) % 40;
      pawn.coordinate = Constants.COORDINATES[index];
    }
  }

  getBoard(): Pawn[] {
    return this.pawns;
  }

  private putOnBoard(pawn: Pawn): void {
    switch (pawn.color) {
      case Color.RED:
        pawn.coordinate = Constants.COORDINATES[Constants.RED_START];
        break;
      case Color.BLEU:
        pawn.coordinate = Constants.COORDINATES[Constants.BLEU_START];
        break;
      case Color.GREEN:
        pawn.coordinate = Constants.COORDINATES[Constants.GREEN_START];
        break;
      case Color.YELLOW:
        pawn.coordinate = Constants.COORDINATES[Constants.YELLOW_START];
        break;
    }
  }
}
