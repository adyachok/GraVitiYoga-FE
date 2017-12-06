import {TimeModel} from './time.model';

export class TimeModelFactory {

  static build(time: string): TimeModel {
    const splited = time.split(':');
    return new TimeModel(Number(splited[0]), Number(splited[1]));
  }
}
