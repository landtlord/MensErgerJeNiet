import {Component, OnInit} from '@angular/core';
import {PlayFieldService} from '../services/play-field.service';
import {Pawn} from '../model/pawn/pawn';
import {SvgCircle} from '../model/pawn/svg-circle';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.svg',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  pawns: Pawn[] = [];
  svgCircles: SvgCircle[] = [];
  clickedPawn: Pawn | null = null;

  constructor(public playFieldService: PlayFieldService) {
  }

  static getPlace(item: number): string {
    return ((800 / 22) + item * (800 / 11)).toString();
  }

  ngOnInit(): void {
  }

  setPawns(pawns: Pawn[]): void {
    this.pawns = pawns;
    this.ngOnInit();
  }

  getX(pawn: Pawn | null): string {
    if (pawn === null) {
      return '0';
    }
    return BoardComponent.getPlace(pawn.coordinate.x);
  }

  getY(pawn: Pawn | null): string {
    if (pawn === null) {
      return '0';
    }
    return BoardComponent.getPlace(pawn.coordinate.y);
  }

  pawnClick(pawn: Pawn): void {
    this.clickedPawn = pawn;
  }
}
