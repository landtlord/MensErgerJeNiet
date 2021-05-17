import {Injectable} from '@angular/core';
import {PlayFieldService} from './play-field.service';
import {Pawn} from '../model/pawn/pawn';
import {Constants} from '../common/Constants';
import {Player} from '../model/player';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class MoveValidatorService {

  constructor(private notificationService: NotificationsService) {
  }

  public isValidMove(pawn: Pawn | null, dice: number | null, player: Player): boolean {
    if (dice === null) {
      this.notificationService.info('Dice not rolled', 'Please press roll the dice');
      return false;
    }
    if (pawn === null) {
      this.notificationService.info('No pawn selected', 'Please pick a pawn to move or pass');
      return false;
    }
    if (player.color !== pawn.color) {
      this.notificationService.info('Wrong pawn selected', 'Please pick one of your own pawns to move or pass');
      return false;
    }

    return this.followsGameRules(pawn, dice);

  }

  private followsGameRules(pawn: Pawn, dice: number): boolean {
    const isOnBoard: boolean = this.pawnIsOnBoard(pawn);
    if (!isOnBoard && this.canStartFromHome(dice)) {
      return true;
    }
    if (isOnBoard) {
      return true;
    }
    this.notificationService.info('Illegal move', 'Please pick another pawn or pass');
    return false;
  }

  private canStartFromHome(dice: number): boolean {
    return dice === 6;
  }

  private pawnIsOnBoard(pawn: Pawn): boolean {
    for (const coordinate of Constants.COORDINATES) {
      if (coordinate.x === pawn.coordinate.x && coordinate.y === pawn.coordinate.y) {
        return true;
      }
    }
    return false;
  }
}
