import {TrainingEvent} from './training.event.model';

export class TrainingEventSelection {
  id: number;
  trainingEvent: TrainingEvent;
  selectedCells: any[];

  constructor(trainingEvent: TrainingEvent) {
    this.id = new Date().getTime() / 1000;
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
    return this.trainingEvent.intersect(otherTrainingEvent);
  }

  intersect(other: TrainingEventSelection) {
    return this.trainingEvent.intersect(other.trainingEvent);
  }

  compare(other) {
    if (this.trainingEvent.eq(other.trainingEvent)) {
      return 0;
    } else if (this.trainingEvent.gt(other.trainingEvent)) {
      return 1;
    } else {
      return -1;
    }
  }
}
