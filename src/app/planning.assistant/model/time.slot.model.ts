import {TimeModel} from './time.model';

export class TimeSlotModel {
  start: TimeModel;
  finish: TimeModel;
  day: string;

  constructor(start: TimeModel, finish: TimeModel, day: string) {
    this.start = start;
    this.finish = finish;
    this.day = day;
  }

  eq(other: TimeSlotModel): boolean {
    return this.day === other.day && this.start.eq(other.start) && this.finish.eq(other.finish);
  }

  gt(other: TimeSlotModel): boolean {
    return this.day === other.day && this.start.gt(other.start) && this.finish.gt(other.finish);
  }

  intersect(other: TimeSlotModel): boolean {
    if (this.day === other.day) {
      return this.start.lt(other.start) && this.finish.gt(other.start) ||
        this.start.lt(other.finish) && this.finish.gt(other.finish);
    }
    return false;
  }
}
