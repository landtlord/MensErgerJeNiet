import {Component, OnInit} from '@angular/core';
import {PlayFieldService} from '../services/play-field.service';
import {Pawn} from '../model/pawn/pawn';
import {SvgCircle} from '../model/pawn/svg-circle';
import {Color} from '../model/pawn/color.enum';
import {Coordinate} from '../model/pawn/coordinate';

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
    this.pawns = this.playFieldService.getBoard();
  }

  getPawnToMove(): Pawn | null {
    return this.clickedPawn;
  }

  getX(pawn: Pawn): string {
    return BoardComponent.getPlace(pawn.coordinate.x);
  }

  getY(pawn: Pawn): string {
    return BoardComponent.getPlace(pawn.coordinate.y);
  }

  pawnClick(pawn: Pawn): void {
    this.clickedPawn = pawn;
  }
}
