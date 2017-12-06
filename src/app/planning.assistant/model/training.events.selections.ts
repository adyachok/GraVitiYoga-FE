import {TrainingEventSelection} from './training.event.selection.model';
import {TrainingEventRendererHelper} from '../helper/renderer.helper';

export class TrainingEventsSelections {
  selection: TrainingEventSelection[];

  constructor() {
    this.selection = [];
  }

  delete(trainingEventSelection: TrainingEventSelection, drawHelper: TrainingEventRendererHelper = null) {
    // TODO: remove training name and selected class
    trainingEventSelection = this.get(trainingEventSelection);
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

  get(trainingEventSelection: TrainingEventSelection): TrainingEventSelection {
    const idx = this.selection.indexOf(trainingEventSelection);
    if (idx < 0) {
      const trainings = this.getOnStartFinishAndDay(trainingEventSelection);
      if (trainings.length) {
        return trainings[0];
      } else {
        return null;
      }
    }
    return this.selection[idx];
  }

  private getOnStartFinishAndDay(trainingEventSelection: TrainingEventSelection):
  TrainingEventSelection[] {
    const trainings = this.selection.filter( event => (
      event.trainingEvent.startTime.eq(trainingEventSelection.trainingEvent.startTime) &&
      event.trainingEvent.finishTime.eq(trainingEventSelection.trainingEvent.finishTime) &&
      event.trainingEvent.weekDay === trainingEventSelection.trainingEvent.weekDay));
    return trainings;
  }

  searchOnTime(time: string, day: string, searchOnFinishTime = true): TrainingEventSelection[] {
    let trainings = [];
    if (searchOnFinishTime) {
      trainings = this.selection.filter(trainingEventSelection => (
        trainingEventSelection.trainingEvent.finishTime.toString() === time &&
        trainingEventSelection.trainingEvent.weekDay === day));
    } else {
      trainings = this.selection.filter(trainingEventSelection => (
        trainingEventSelection.trainingEvent.startTime.toString() === time &&
        trainingEventSelection.trainingEvent.weekDay === day));
    }
    return trainings;
  }

  searchOnCellClicked(event: any): TrainingEventSelection {
    const target = event.currentTarget;
    const eventDay = target.attributes['data-day'].value;
    const dayEvents = this.selection.filter( dayEvent => dayEvent.trainingEvent.weekDay === eventDay);
    if (dayEvents.length) {
      const selected = dayEvents.filter( dayEvent => dayEvent.isCellInSelectedCells(target));
      if (selected.length) {
        return selected[0];
      }
    }
    return null;
  }
}
