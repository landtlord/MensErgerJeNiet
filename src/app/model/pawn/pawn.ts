import {Color} from './color.enum';
import {Coordinate} from './coordinate';

export interface Pawn {
  id: number;

  color: Color;

  colorId: number;

  coordinate: Coordinate;

}
