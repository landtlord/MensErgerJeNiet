import {Component, OnInit} from '@angular/core';
import {DiceService} from '../services/dice/dice.service';
import {PlayFieldService} from '../services/play-field.service';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit {
  dice: number | undefined;

  pawnOn = 0;

  constructor(private diceService: DiceService,
              public playFieldService: PlayFieldService) {
  }

  ngOnInit(): void {
    this.playFieldService.initiate();
  }

  rollDice(): void {
    this.dice = this.diceService.rollDice();
    this.playFieldService.movePawnOn(this.pawnOn, this.dice);
    this.pawnOn += this.dice;
  }
}
