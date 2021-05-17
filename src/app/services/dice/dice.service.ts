import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dice} from '../../model/Dice/dice';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  private diceUrl = 'api/dices/new/';

  constructor(private http: HttpClient) {
  }

  rollDice(): Observable<Dice> {
    return this.http.get<Dice>(this.diceUrl).pipe(catchError(error => {
      return throwError(error.message);
    }));
  }


}
