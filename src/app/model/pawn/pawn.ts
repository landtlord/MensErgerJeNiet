import {Color} from './color.enum';
import {Coordinate} from './coordinate';

export class Pawn {
  color: Color;

  coordinate: Coordinate;


  constructor(color: Color, coordinate: Coordinate) {
    this.color = color;
    this.coordinate = coordinate;
  }
}
