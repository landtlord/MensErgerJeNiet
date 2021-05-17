import {Color} from './pawn/color.enum';

export interface Player {
  id: number;

  name: string;

  color: Color;

  colorId: number;
}
