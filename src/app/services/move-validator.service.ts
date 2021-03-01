import {Injectable} from '@angular/core';
import {PlayFieldService} from './play-field.service';
import {Pawn} from '../model/pawn/pawn';
import {Constants} from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class MoveValidatorService {

  constructor() {
  }

  public isValidMove(pawn: Pawn, dice: number): boolean {
    const isOnBoard: boolean = Constants.COORDINATES.includes(pawn.coordinate);
    const canStartFromHome: boolean = this.canStartFromHome(isOnBoard, dice);

    return isOnBoard || canStartFromHome;
  }

  private canStartFromHome(isOnBoard: boolean, dice: number): boolean {
    return !isOnBoard && dice === 6;
  }
}
