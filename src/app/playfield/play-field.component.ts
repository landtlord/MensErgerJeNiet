import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DiceService} from '../services/dice/dice.service';
import {PlayFieldService} from '../services/play-field.service';
import {BoardComponent} from '../board/board.component';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit, AfterViewInit {
  dice: number | undefined;

  pawnOn = 0;

  // @ts-ignore
  @ViewChild(BoardComponent) board: BoardComponent;

  constructor(private diceService: DiceService,
              public playFieldService: PlayFieldService) {
  }

  ngOnInit(): void {
    this.playFieldService.initiate();
  }

  rollDice(): void {
    this.dice = this.diceService.rollDice();
    const pawnToMove = this.board.getPawnToMove();
    this.playFieldService.movePawn(pawnToMove, this.dice);
  }

  ngAfterViewInit(): void {
  }
}
