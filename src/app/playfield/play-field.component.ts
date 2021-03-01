import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DiceService} from '../services/dice/dice.service';
import {PlayFieldService} from '../services/play-field.service';
import {BoardComponent} from '../board/board.component';
import {NotificationsService} from 'angular2-notifications';
import {MoveValidatorService} from '../services/move-validator.service';
import {Player} from '../model/player';
import {Color} from '../model/pawn/color.enum';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit, AfterViewInit {
  dice: number | null = null;

  player: Player = new Player(Color.BLEU);

  pawnOn = 0;

  // @ts-ignore
  @ViewChild(BoardComponent) board: BoardComponent;

  constructor(private diceService: DiceService,
              public playFieldService: PlayFieldService,
              private notificationService: NotificationsService,
              private moveValidatorService: MoveValidatorService) {
  }

  ngOnInit(): void {
    this.playFieldService.initiate();
  }

  rollDice(): void {
    this.dice = this.diceService.rollDice();
  }

  moveSelectedPawn(): void {
    if (this.board.clickedPawn !== null && this.dice !== null) {
      if (this.isValidMove()) {
        this.movePawn();
      } else {
        this.notificationService.info('Illegal Move', 'Please try again or pass');
        this.board.clickedPawn = null;
      }
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

  nextPlayer(): void {

  }
}
