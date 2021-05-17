import {Component, OnInit} from '@angular/core';
import {PlayFieldService} from '../services/play-field.service';
import {PlayerService} from '../services/player.service';
import {Player} from '../model/player';
import {Game} from '../model/game';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.css']
})
export class StartDialogComponent implements OnInit {
  playerUrl = '/api/players/';

  redPlayer = '';
  bluePlayer = '';
  greenPlayer = '';
  yellowPlayer = '';

  constructor(public dialogRef: MatDialogRef<StartDialogComponent>,
              private playFieldService: PlayFieldService,
              private playerService: PlayerService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  createPlayers(): void {
    if (this.redPlayer.trim().length !== 0) {
      const headers = {'content-type': 'application/json'};
      const body = '{"name" : "' + this.redPlayer + '", "colorId": 1 }';
      this.http.post<Player>(this.playerUrl, body, {headers})
        .pipe(catchError(error => {
          return throwError(error.message);
        }))
        .subscribe(data => {
          this.playFieldService.playerArray.push(data.id);
          console.log(this.playFieldService.playerArray.join());
        });
    }
    if (this.bluePlayer.trim().length !== 0) {
      const headers = {'content-type': 'application/json'};
      const body = '{"name" : "' + this.bluePlayer + '", "colorId": 2 }';
      this.http.post<Player>(this.playerUrl, body, {headers})
        .pipe(catchError(error => {
          return throwError(error.message);
        }))
        .subscribe(data => {
          this.playFieldService.playerArray.push(data.id);
          console.log(this.playFieldService.playerArray.join());
        });
    }
    if (this.greenPlayer.trim().length !== 0) {
      const headers = {'content-type': 'application/json'};
      const body = '{"name" : "' + this.greenPlayer + '", "colorId": 3 }';
      this.http.post<Player>(this.playerUrl, body, {headers})
        .pipe(catchError(error => {
          return throwError(error.message);
        }))
        .subscribe(data => {
          this.playFieldService.playerArray.push(data.id);
          console.log(this.playFieldService.playerArray.join());
        });
    }
    if (this.yellowPlayer.trim().length !== 0) {
      const headers = {'content-type': 'application/json'};
      const body = '{"name" : "' + this.yellowPlayer + '", "colorId": 4 }';
      this.http.post<Player>(this.playerUrl, body, {headers})
        .pipe(catchError(error => {
          return throwError(error.message);
        }))
        .subscribe(data => {
          this.playFieldService.playerArray.push(data.id);
          console.log(this.playFieldService.playerArray.join());
        });
    }
  }

  start(): void {
    this.playFieldService.initiate();
    this.dialogRef.close();
  }
}
