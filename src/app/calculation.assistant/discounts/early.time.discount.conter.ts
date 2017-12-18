import {ICountable} from './icountable';
import {TimeModel} from '../../planning.assistant/model/time.model';

export class EarlyTimeDiscountCounter implements ICountable {
  private rate: number;
  private toTime: TimeModel;

  constructor() {
    this.rate = 10;
    this.toTime = new TimeModel(10, 0);
  }

  count(value: any): number {
    return undefined;
  }
}
