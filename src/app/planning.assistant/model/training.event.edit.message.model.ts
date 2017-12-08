import {TimeModel} from './time.model';

export class TrainingEventEditMessageModel {
  id: number;
  start: TimeModel;
  name: string;

  constructor( id: number, start: TimeModel, name: string) {
    this.id = id;
    this.start = new TimeModel(start.hour, start.minute); // Object.assign({}, start);
    this.name = name;
  }
}
