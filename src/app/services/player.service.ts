import {Injectable} from '@angular/core';
import {Player} from '../model/player';
import {Color} from '../model/pawn/color.enum';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players: Player[] = [];


  constructor() {
  }

  getNextPlayer(currentPlayer: Player): Player {
    const index = this.players.findIndex(player => player.color === currentPlayer.color);
    const nextIndex = (index + 1) % this.players.length;
    return this.players[nextIndex];
  }


}
