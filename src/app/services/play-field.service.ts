import {Injectable} from '@angular/core';
import {Pawn} from '../model/pawn/pawn';
import {Coordinate} from '../model/pawn/coordinate';
import {Constants} from '../common/Constants';
import {Player} from '../model/player';
import {Game} from '../model/game';
import {HttpClient} from '@angular/common/http';
import {Dice} from '../model/Dice/dice';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayFieldService {

  game: Game;
  gameUrl = 'api/games/';
  currentPlayerIndex = 0;
  playerArray: number[] = [];

  constructor(private http: HttpClient) {
    this.game = new Game(-1, [], [], [], []);
  }

  public static getIndex(pawn: Pawn): number {
    return Constants.COORDINATES.findIndex(coordinate => coordinate === pawn.coordinate);
  }

  initiate(): void {
    const headers = {'content-type': 'application/json'};
    const body = '[' + this.playerArray.join() + ']';
    this.http.post<Game>(this.gameUrl + 'new/', body, {headers})
      .pipe(catchError(error => {
        return throwError(error.message);
      }))
      .subscribe(data => {
        this.game = data;
        console.log(this.game);
      });
  }

  movePawn(pawn: Pawn, dice: Dice): void {
    const headers = {'content-type': 'application/json'};
    const body = '{"diceId" :' + dice.id + ',"pawnToMoveId": ' + pawn.id + ', "playerId": ' + this.getCurrentPlayer().id + '  }';
    // @ts-ignore
    this.http.post<Game>(this.gameUrl + 'move/' + this.game.id, body, {headers})
      .pipe(catchError(error => {
        return throwError(error.message);
      }))
      .subscribe(data => {
        this.game = data;
      });
  }

  getPawns(): Pawn[] {
    if (this.game === null) {
      return [];
    }
    return this.game.pawns;
  }

  getPlayers(): Player[] {
    if (this.game === null) {
      return [];
    }
    return this.game.players;
  }

  getPawnOn(coordinate: Coordinate): Pawn | null {
    // @ts-ignore
    for (const pawn of this.game.pawns) {
      if (pawn.coordinate.x === coordinate.x && pawn.coordinate.y === coordinate.y) {
        return pawn;
      }
    }
    return null;
  }

  checkIfPlayerWins(): boolean {
    const color = this.getCurrentPlayer().color;
    const shelterCoordinates = Constants.getShelterCoordinatesFor(color);
    const pawnsForCurrentPLayer = this.getCurrentPlayerPawns();
    for (const coordinate of shelterCoordinates) {
      if (!this.aPawnIsOnThisCoordinate(coordinate, pawnsForCurrentPLayer)) {
        return false;
      }
    }
    return true;
  }

  private aPawnIsOnThisCoordinate(coordinate: Coordinate, pawnsForCurrentPLayer: Pawn[]): boolean {
    for (const pawn of pawnsForCurrentPLayer) {
      if (pawn.coordinate.x === coordinate.x &&
        pawn.coordinate.y === coordinate.y) {
        return true;
      }
    }
    return false;
  }

  getCurrentPlayer(): Player {
    // @ts-ignore
    return this.game.players[this.currentPlayerIndex];
  }

  getNextPlayer(): Player {
    // @ts-ignore
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.getPlayers().length;
    return this.getCurrentPlayer();
  }

  getCurrentPlayerColor(): string {
    if (this.game.players.length === 0) {
      return 'white';
    }
    return this.getCurrentPlayer().color;
  }

  getCurrentPlayerName(): string {
    if (this.game.players.length === 0) {
      return '';
    }
    return this.getCurrentPlayer().name;
  }

  ongoingGame(): boolean {
    return this.game.id === -1;
  }

  reset(): void {
    this.game = new Game(-1, [], [], [], []);
    this.currentPlayerIndex = 0;
    this.playerArray = [];
  }

  private getCurrentPlayerPawns(): Pawn[] {
    return this.game.pawns.filter(pawn => pawn.color === this.getCurrentPlayer().color);
  }
}
