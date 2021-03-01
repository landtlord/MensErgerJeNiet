import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DiceService} from '../services/dice/dice.service';
import {PlayFieldService} from '../services/play-field.service';
import {BoardComponent} from '../board/board.component';
import {NotificationsService} from 'angular2-notifications';
import {MoveValidatorService} from '../services/move-validator.service';
import {Player} from '../model/player';
import {PlayerService} from '../services/player.service';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit, AfterViewInit {
  dice: number | null = null;

  player: Player;

  // @ts-ignore
  @ViewChild(BoardComponent) board: BoardComponent;

  constructor(private diceService: DiceService,
              public playFieldService: PlayFieldService,
              private notificationService: NotificationsService,
              private moveValidatorService: MoveValidatorService,
              private playerService: PlayerService) {
    this.player = playerService.players[0];
  }

  ngOnInit(): void {
    this.playFieldService.initiate();
  }

  rollDice(): void {
    if (this.dice === null) {
      this.dice = this.diceService.rollDice();
    } else {
      this.notificationService.info('Already rolled the dice', 'Please pick a pawn to move or pass');
    }
  }

  moveSelectedPawn(): void {
    if (this.board.clickedPawn !== null && this.dice !== null) {
      if (this.player.color === this.board.clickedPawn.color) {
        if (this.isValidMove()) {
          this.movePawn();
          this.player = this.playerService.getNextPlayer(this.player);
        } else {
          this.notificationService.info('Illegal Move', 'Please try again or pass');
          this.board.clickedPawn = null;
        }
      } else {
        this.notificationService.info('Can\'t move the pawn of another player', 'Please pick one of your own pawn');
      }
    }
  }

  nextPlayer(): void {
    if (this.dice !== null) {
      this.player = this.playerService.getNextPlayer(this.player);
      this.board.clickedPawn = null;
      this.dice = null;
    } else {
      this.notificationService.info('Roll the dice before passing', 'Press the roll the dice button');
    }
  }

  private movePawn(): void {
    // @ts-ignore
    this.playFieldService.movePawn(this.board.clickedPawn, this.dice);
    this.board.clickedPawn = null;
    this.dice = null;
  }

  ngAfterViewInit(): void {
  }

  private isValidMove(): boolean {
    // @ts-ignore
    return this.moveValidatorService.isValidMove(this.board.clickedPawn, this.dice);
  }
}
