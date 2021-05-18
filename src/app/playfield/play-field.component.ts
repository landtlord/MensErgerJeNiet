import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DiceService} from '../services/dice/dice.service';
import {PlayFieldService} from '../services/play-field.service';
import {BoardComponent} from '../board/board.component';
import {NotificationsService} from 'angular2-notifications';
import {MoveValidatorService} from '../services/move-validator.service';
import {Player} from '../model/player';
import {Dice} from '../model/Dice/dice';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {StartDialogComponent} from '../start-dialog/start-dialog.component';
import {WinnerDialogComponent} from '../winner-dialog/winner-dialog.component';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit, AfterViewInit {
  dice: Dice | null = null;
  diceNumber: number | null = null;

  player: Player | null = null;
  currentPlayerColor = 'black';

  // @ts-ignore
  @ViewChild(BoardComponent) board: BoardComponent;

  constructor(private diceService: DiceService,
              public playFieldService: PlayFieldService,
              private notificationService: NotificationsService,
              private moveValidatorService: MoveValidatorService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  rollDice(): void {
    if (this.dice === null) {
      this.diceService.rollDice().subscribe(data => {
        this.dice = data;
        this.diceNumber = data.dice;
      });
    } else {
      this.notificationService.info('Already rolled the dice', 'Please pick a pawn to move or pass');
    }
  }

  moveSelectedPawn(): void {
    if (this.isValidMove()) {
      this.movePawn();
      if (this.playFieldService.checkIfPlayerWins()) {
        const matDialogRef = this.dialog.open(WinnerDialogComponent);
        return;
      }
      this.setNextPlayer();
    } else {
      this.board.clickedPawn = null;
    }
  }

  nextPlayer(): void {
    if (this.dice !== null) {
      // @ts-ignore
      this.player = this.playFieldService.getNextPlayer();
      this.currentPlayerColor = this.player.color;
      this.resetDiceAndPawn();
    } else {
      this.notificationService.info('Roll the dice before passing', 'Press the roll the dice button');
    }
  }

  private movePawn(): void {
    // @ts-ignore
    this.playFieldService.movePawn(this.board.clickedPawn, this.dice);
  }

  ngAfterViewInit(): void {
  }

  private isValidMove(): boolean {
    // @ts-ignore
    return this.moveValidatorService.isValidMove(this.board.clickedPawn, this.diceNumber, this.player);
  }

  private setNextPlayer(): void {
    if (this.diceNumber === 6) {
      this.player = this.playFieldService.getCurrentPlayer();
    } else {
      this.player = this.playFieldService.getNextPlayer();
    }
    this.currentPlayerColor = this.player.color;
    this.resetDiceAndPawn();
  }

  private resetDiceAndPawn(): void {
    this.board.clickedPawn = null;
    this.dice = null;
    this.diceNumber = null;
    this.board.setPawns(this.playFieldService.getPawns());
  }

  getDice(): number {
    if (this.dice === null) {
      return 0;
    }
    return this.dice.dice;
  }

  startGame(): void {
    const matDialogRef = this.dialog.open(StartDialogComponent);
    matDialogRef.afterClosed().subscribe(result => {
      console.log('new game created');
    });
    this.player = this.playFieldService.getCurrentPlayer();
    this.currentPlayerColor = this.playFieldService.getCurrentPlayer().color;
    this.board.setPawns(this.playFieldService.getPawns());
  }
}
