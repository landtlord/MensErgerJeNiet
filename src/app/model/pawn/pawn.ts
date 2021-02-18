import {Color} from './color.enum';
import {Coordinate} from './coordinate';

export class Pawn {
  color: Color;

  coordinate: Coordinate;

  name: string;


  constructor(color: Color, coordinate: Coordinate, name: string) {
    this.color = color;
    this.coordinate = coordinate;
    this.name = name;
  }
}
