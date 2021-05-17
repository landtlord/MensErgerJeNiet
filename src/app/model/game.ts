import {Pawn} from './pawn/pawn';
import {Player} from './player';

export class Game {
  id: number;

  pawnsIds: number[];

  pawns: Pawn[];

  playersIds: number[];

  players: Player[];


  constructor(id: number, pawnsIds: number[], pawns: Pawn[], playersIds: number[], players: Player[]) {
    this.id = id;
    this.pawnsIds = pawnsIds;
    this.pawns = pawns;
    this.playersIds = playersIds;
    this.players = players;
  }
}
