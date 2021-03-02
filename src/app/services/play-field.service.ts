import {Injectable} from '@angular/core';
import {Pawn} from '../model/pawn/pawn';
import {Color} from '../model/pawn/color.enum';
import {Coordinate} from '../model/pawn/coordinate';
import {Constants} from '../common/Constants';
import {Player} from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayFieldService {

  constructor() {
  }

  pawns: Pawn[] = [];

  public static getIndex(pawn: Pawn): number {
    return Constants.COORDINATES.findIndex(coordinate => coordinate === pawn.coordinate);
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
    let index = PlayFieldService.getIndex(pawn);

    if (index === -1) {
      this.putOnBoard(pawn);
    } else if (!this.isGoingInShelter(pawn, dice)) {
      index = (index + dice) % 40;
      const coordinate = Constants.COORDINATES[index];
      this.movePawnTo(pawn, coordinate);
    } else {
      const indexForLastCoordinate = Constants.getIndexForLastCoordinate(pawn);
      let indexInShelter = index + dice - indexForLastCoordinate - 1;
      if (indexInShelter === 4) {
        indexInShelter = 2;
      }
      if (indexInShelter === 5) {
        indexInShelter = 1;
      }
      pawn.coordinate = Constants.getShelterCoordinatesFor(pawn.color)[indexInShelter];
    }
  }

  getPawns(): Pawn[] {
    return this.pawns;
  }

  getPawnOn(coordinate: Coordinate): Pawn | null {
    for (const pawn of this.pawns) {
      if (pawn.coordinate === coordinate) {
        return pawn;
      }
    }
    return null;
  }

  private putOnBoard(pawn: Pawn): void {
    switch (pawn.color) {
      case Color.RED:
        this.movePawnTo(pawn, Constants.COORDINATES[Constants.RED_START]);
        break;
      case Color.BLEU:
        this.movePawnTo(pawn, Constants.COORDINATES[Constants.BLEU_START]);
        break;
      case Color.GREEN:
        this.movePawnTo(pawn, Constants.COORDINATES[Constants.GREEN_START]);
        break;
      case Color.YELLOW:
        this.movePawnTo(pawn, Constants.COORDINATES[Constants.YELLOW_START]);
        break;
    }
  }

  private movePawnTo(pawn: Pawn, coordinate: Coordinate): void {
    this.sendHome(this.getPawnOn(coordinate));
    pawn.coordinate = coordinate;
  }

  private isGoingInShelter(pawn: Pawn, dice: number): boolean {
    const index = PlayFieldService.getIndex(pawn);
    const indexForLastCoordinate = Constants.getIndexForLastCoordinate(pawn);
    return index < indexForLastCoordinate && (index + dice) > indexForLastCoordinate;
  }

  private sendHome(pawn: Pawn | null): void {
    if (pawn !== null) {
      const homeCoordinates = Constants.getHomeCoordinatesFor(pawn);
      pawn.coordinate = this.findFirstEmpty(homeCoordinates);
    }
  }

  // @ts-ignore
  private findFirstEmpty(coordinates: Coordinate[]): Coordinate {
    for (const coordinate of coordinates) {
      if (this.getPawnOn(coordinate) === null) {
        return coordinate;
      }
    }
  }

  checkIfPlayerWins(player: Player): boolean {
    const shelterCoordinates = Constants.getShelterCoordinatesFor(player.color);
    for (const coordinate of shelterCoordinates) {
      if (this.getPawnOn(coordinate) === null) {
        return false;
      }
    }
    return true;
  }
}
