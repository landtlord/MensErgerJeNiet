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

  constructor(private notificationService: NotificationsService,
              private playFieldService: PlayFieldService) {
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
    const isOnBoard: boolean = Constants.COORDINATES.includes(pawn.coordinate);

    if (isOnBoard && !this.isGoingInShelter(pawn, dice)) {
      return true;
    }
    if (isOnBoard && this.isGoingInShelter(pawn, dice) && this.isSpaceAvailableInShelter(pawn, dice)) {
      return true;
    }
    if (!isOnBoard && this.canStartFromHome(dice)) {
      return true;
    }
    this.notificationService.info('Illegal move', 'Please pick another pawn or pass');
    return false;
  }

  private canStartFromHome(dice: number): boolean {
    return dice === 6;
  }

  private isGoingInShelter(pawn: Pawn, dice: number): boolean {
    const index = PlayFieldService.getIndex(pawn);
    const indexForLastCoordinate = Constants.getIndexForLastCoordinate(pawn);
    return index < indexForLastCoordinate && (index + dice) > indexForLastCoordinate;
  }

  private isSpaceAvailableInShelter(pawn: Pawn, dice: number): boolean {
    const index = PlayFieldService.getIndex(pawn);
    const indexForLastCoordinate = Constants.getIndexForLastCoordinate(pawn);
    let indexInShelter = index + dice - indexForLastCoordinate - 1;
    if (indexInShelter === 4) {
      indexInShelter = 2;
    }
    if (indexInShelter === 5) {
      indexInShelter = 1;
    }
    const shelter = Constants.getShelterCoordinatesFor(pawn.color);
    const pawnOn = this.playFieldService.getPawnOn(shelter[indexInShelter]);
    return pawnOn === null;
  }

}
