import {Component, OnInit} from '@angular/core';
import {DiceService} from '../services/dice/dice.service';
import {PlayFieldPlace} from '../model/play-field-place';
import {PlayField} from '../model/play-field';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.css']
})
export class PlayFieldComponent implements OnInit {
  dice: number | undefined;
  playField: PlayField;

  constructor(private diceService: DiceService) {
    this.playField = new PlayField();
  }

  ngOnInit(): void {
  }

  rollDice(): void {
    this.dice = this.diceService.rollDice();
  }
}
