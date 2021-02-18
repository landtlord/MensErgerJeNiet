import {Component, OnInit} from '@angular/core';
import {PlayFieldService} from '../services/play-field.service';
import {Pawn} from '../model/pawn/pawn';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.svg',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cx = '200';
  cy = '240';
  pawns: Pawn[] = [];
  fill = 'white';

  constructor(public playFieldService: PlayFieldService) {
  }

  ngOnInit(): void {
    this.pawns = this.playFieldService.getBoard();
    this.putPawnOnBoard();
  }

  putPawnOnBoard(): void {
    const pawn: Pawn = this.pawns[0];
    this.cx = ((800 / 22) + pawn.coordinate.x * (800 / 11)).toString();
    this.cy = ((800 / 22) + pawn.coordinate.y * (800 / 11)).toString();
    this.fill = pawn.color.toString();
  }

}
