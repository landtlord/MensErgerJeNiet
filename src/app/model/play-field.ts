import {PlayFieldPlace} from './play-field-place';

export class PlayField {
  playFieldPlaces: PlayFieldPlace[];

  constructor() {
    this.playFieldPlaces = generateNewPlayField();
  }
}

function generateNewPlayField(): PlayFieldPlace[] {
  const arrayToCreate: PlayFieldPlace[] = new Array(40);
  for (let i = 0; i < arrayToCreate.length; i++) {
    arrayToCreate[i] = new PlayFieldPlace(i);
  }
  return arrayToCreate;
}
