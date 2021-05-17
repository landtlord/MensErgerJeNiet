import {Coordinate} from '../model/pawn/coordinate';
import {Pawn} from '../model/pawn/pawn';
import {Color} from '../model/pawn/color.enum';

export class Constants {
  public static COORDINATES: Coordinate[] = [
    new Coordinate(0, 4),
    new Coordinate(1, 4),
    new Coordinate(2, 4),
    new Coordinate(3, 4),
    new Coordinate(4, 4),
    new Coordinate(4, 3),
    new Coordinate(4, 2),
    new Coordinate(4, 1),
    new Coordinate(4, 0),
    new Coordinate(5, 0),
    new Coordinate(6, 0),
    new Coordinate(6, 1),
    new Coordinate(6, 2),
    new Coordinate(6, 3),
    new Coordinate(6, 4),
    new Coordinate(7, 4),
    new Coordinate(8, 4),
    new Coordinate(9, 4),
    new Coordinate(10, 4),
    new Coordinate(10, 5),
    new Coordinate(10, 6),
    new Coordinate(9, 6),
    new Coordinate(8, 6),
    new Coordinate(7, 6),
    new Coordinate(6, 6),
    new Coordinate(6, 7),
    new Coordinate(6, 8),
    new Coordinate(6, 9),
    new Coordinate(6, 10),
    new Coordinate(5, 10),
    new Coordinate(4, 10),
    new Coordinate(4, 9),
    new Coordinate(4, 8),
    new Coordinate(4, 7),
    new Coordinate(4, 6),
    new Coordinate(3, 6),
    new Coordinate(2, 6),
    new Coordinate(1, 6),
    new Coordinate(0, 6),
    new Coordinate(0, 5)
  ];

  public static RED_SHELTER: Coordinate[] = [
    new Coordinate(1, 5),
    new Coordinate(2, 5),
    new Coordinate(3, 5),
    new Coordinate(4, 5)
  ];

  public static BLEU_SHELTER: Coordinate[] = [
    new Coordinate(5, 1),
    new Coordinate(5, 2),
    new Coordinate(5, 3),
    new Coordinate(5, 4)
  ];

  public static GREEN_SHELTER: Coordinate[] = [
    new Coordinate(9, 5),
    new Coordinate(8, 5),
    new Coordinate(7, 5),
    new Coordinate(6, 5)
  ];

  public static YELLOW_SHELTER: Coordinate[] = [
    new Coordinate(5, 9),
    new Coordinate(5, 8),
    new Coordinate(5, 7),
    new Coordinate(5, 6)
  ];

  public static getShelterCoordinatesFor(color: string): Coordinate[] {
    switch (color) {
      case 'RED':
        return Constants.RED_SHELTER;
      case 'BLEU':
        return Constants.BLEU_SHELTER;
      case 'GREEN':
        return Constants.GREEN_SHELTER;
      case 'YELLOW':
        return Constants.YELLOW_SHELTER;
      default:
        return [];
    }
  }
}
