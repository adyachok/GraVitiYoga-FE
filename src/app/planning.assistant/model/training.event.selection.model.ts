import {TrainingEvent} from './training.event.model';

export class TrainingEventSelection {
  trainingEvent: TrainingEvent;
  selectedCells: any[];

  constructor(trainingEvent: TrainingEvent) {
    this.trainingEvent = trainingEvent;
    this.selectedCells = [];
  }

  isCellInSelectedCells(cell: any): boolean {
    const filtered = this.selectedCells.filter( selectedCell => (
      selectedCell.attributes['data-startTime'].value === cell.attributes['data-startTime'].value &&
      selectedCell.attributes['data-finishTime'].value === cell.attributes['data-finishTime'].value)
      );
    if (filtered.length) {
      return true;
    }
    return false;
  }

  checkEventTimeIntersection (otherTrainingEvent: TrainingEvent): boolean {
    return this.trainingEvent.startTime.lt(otherTrainingEvent.finishTime) &&
      this.trainingEvent.finishTime.gt(otherTrainingEvent.finishTime) ||
      this.trainingEvent.startTime.gt(otherTrainingEvent.startTime) &&
      this.trainingEvent.finishTime.gt(otherTrainingEvent.startTime);
  }
}
