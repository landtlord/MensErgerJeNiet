import {Injectable} from '@angular/core';
import {Pawn} from '../model/pawn/pawn';
import {Color} from '../model/pawn/color.enum';
import {Coordinate} from '../model/pawn/coordinate';

@Injectable({
  providedIn: 'root'
})
export class PlayFieldService {
  pawns: Pawn[] = [];

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
  }


  private readonly RED_START = this.coordinates[0];
  private readonly BLEU_START = this.coordinates[10];
  private readonly GREEN_START = this.coordinates[20];
  private readonly YELLOW_START = this.coordinates[30];

  initiate(): void {
    this.pawns.push(new Pawn(Color.RED, new Coordinate(0, 0), 'Red1'));
    this.pawns.push(new Pawn(Color.RED, new Coordinate(0, 1), 'Red2'));
    this.pawns.push(new Pawn(Color.RED, new Coordinate(1, 0), 'Red3'));
    this.pawns.push(new Pawn(Color.RED, new Coordinate(1, 1), 'Red4'));
    this.pawns.push(new Pawn(Color.BLEU, new Coordinate(9, 0), 'Bleu1'));
    this.pawns.push(new Pawn(Color.BLEU, new Coordinate(9, 1), 'Bleu2'));
    this.pawns.push(new Pawn(Color.BLEU, new Coordinate(10, 0), 'Bleu3'));
    this.pawns.push(new Pawn(Color.BLEU, new Coordinate(10, 1), 'Bleu4'));
    this.pawns.push(new Pawn(Color.GREEN, new Coordinate(9, 9), 'Green1'));
    this.pawns.push(new Pawn(Color.GREEN, new Coordinate(9, 10), 'Green2'));
    this.pawns.push(new Pawn(Color.GREEN, new Coordinate(10, 9), 'Green3'));
    this.pawns.push(new Pawn(Color.GREEN, new Coordinate(10, 10), 'Green4'));
    this.pawns.push(new Pawn(Color.YELLOW, new Coordinate(0, 9), 'Yellow1'));
    this.pawns.push(new Pawn(Color.YELLOW, new Coordinate(0, 10), 'Yellow2'));
    this.pawns.push(new Pawn(Color.YELLOW, new Coordinate(1, 9), 'Yellow3'));
    this.pawns.push(new Pawn(Color.YELLOW, new Coordinate(1, 10), 'Yellow4'));
  }

  movePawn(pawn: Pawn, dice: number): void {
    let index = this.coordinates.findIndex(coordinate => coordinate === pawn.coordinate);
    if (index === -1) {
      switch (pawn.color) {
        case Color.RED:
          pawn.coordinate = this.RED_START;
          break;
        case Color.BLEU:
          pawn.coordinate = this.BLEU_START;
          break;
        case Color.GREEN:
          pawn.coordinate = this.GREEN_START;
          break;
        case Color.YELLOW:
          pawn.coordinate = this.YELLOW_START;
          break;
      }
    } else {
      index = (index + dice) % 40;
      pawn.coordinate = this.coordinates[index];
    }
  }

  getBoard(): Pawn[] {
    return this.pawns;
  }

  mapPlaceOnFieldToCoordinate(placeOnField: number): Coordinate {
    return this.coordinates[placeOnField];
  }
}
