import {TrainingEventSelection} from './training.event.selection.model';
import {TrainingEventRendererHelper} from '../helper/renderer.helper';

export class TrainingEventsSelections {
  selection: TrainingEventSelection[];

  constructor() {
    this.selection = [];
  }

  delete(trainingEventSelection: TrainingEventSelection, drawHelper: TrainingEventRendererHelper = null) {
    // TODO: remove training name and selected class
    trainingEventSelection = this.get(trainingEventSelection.id);
    if (trainingEventSelection) {
      this.selection.splice(this.selection.indexOf(trainingEventSelection), 1);
      if (drawHelper) {
        for (const cell of trainingEventSelection.selectedCells) {
          drawHelper.unselectCell(cell);
        }
      }
    }
  }

  put(trainingEventSelection: TrainingEventSelection, drawHelper: TrainingEventRendererHelper = null) {
    this.delete(trainingEventSelection, drawHelper);
    this.selection.push(trainingEventSelection);
    if (drawHelper) {
      for (const cell of trainingEventSelection.selectedCells) {
        drawHelper.selectCell(cell);
      }
    }
  }

  get(id: number): TrainingEventSelection {
    return this.searchOnId(id);
  }

  private getOnStartFinishAndDay(trainingEvtSelection: TrainingEventSelection): TrainingEventSelection[] {
    return this.selection.filter( event => event.trainingEvent.eq(trainingEvtSelection.trainingEvent));
  }

  searchOnTime(time: string, day: string, searchOnFinishTime = true): TrainingEventSelection[] {
    let trainings = [];
    if (searchOnFinishTime) {
      trainings = this.selection.filter(trainingEventSelection => (
        trainingEventSelection.trainingEvent.timeSlot.finish.toString() === time &&
        trainingEventSelection.trainingEvent.timeSlot.day === day));
    } else {
      trainings = this.selection.filter(trainingEventSelection => (
        trainingEventSelection.trainingEvent.timeSlot.start.toString() === time &&
        trainingEventSelection.trainingEvent.timeSlot.day === day));
    }
    return trainings;
  }

  searchOnCellClicked(event: any): TrainingEventSelection {
    const target = event.currentTarget;
    const eventDay = target.attributes['data-day'].value;
    const dayEvents = this.selection.filter( dayEvent => dayEvent.trainingEvent.timeSlot.day === eventDay);
    if (dayEvents.length) {
      const selected = dayEvents.filter( dayEvent => dayEvent.isCellInSelectedCells(target));
      if (selected.length) {
        return selected[0];
      }
    }
    return null;
  }

  searchOnId(id: number) {
    return this.selection.find(selection => selection.id === id);
  }
}
