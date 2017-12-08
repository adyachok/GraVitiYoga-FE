import {TimeSlotModel} from './time.slot.model';

export class TrainingEvent {
  trainingName: string;
  timeSlot: TimeSlotModel;

  constructor(trainingName: string, timeSlot: TimeSlotModel) {
    this.trainingName = trainingName;
    this.timeSlot = timeSlot;
  }

  intersect(other: TrainingEvent): boolean {
    return this.timeSlot.intersect(other.timeSlot);
  }

  eq(other: TrainingEvent): boolean {
    return this.timeSlot.eq(other.timeSlot);
  }
}
