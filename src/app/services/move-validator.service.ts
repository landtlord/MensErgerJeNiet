import {Injectable} from '@angular/core';
import {PlayFieldService} from './play-field.service';
import {Pawn} from '../model/pawn/pawn';

@Injectable({
  providedIn: 'root'
})
export class MoveValidatorService {

  constructor(private playFieldService: PlayFieldService) {
  }

  public isValidMove(pawn: Pawn, dice: number): boolean {
    const isOnBoard: boolean = this.playFieldService.coordinates.includes(pawn.coordinate);
    const canStartFromHome: boolean = this.canStartFromHome(isOnBoard, dice);

    return isOnBoard || canStartFromHome;
  }

  private canStartFromHome(isOnBoard: boolean, dice: number): boolean {
    return !isOnBoard && dice === 6;
  }
}
