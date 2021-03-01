import {Color} from './pawn/color.enum';

export class Player {
  color: Color;

  constructor(color: Color) {
    this.color = color;
  }
}
