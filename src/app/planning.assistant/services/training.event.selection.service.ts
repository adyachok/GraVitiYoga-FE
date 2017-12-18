import {TrainingEventRendererHelper} from '../helper/renderer.helper';
import {TrainingEventSelection} from '../model/training.event.selection.model';
import {Injectable} from '@angular/core';
import {TimeSlotModel} from '../model/time.slot.model';
import {Settings} from '../../settings/settings';
import {UpdateAction} from '../update.action.enum';
import {TrainingEventEditMessageModel} from '../model/training.event.edit.message.model';

@Injectable()
export class TrainingEventSelectionService {
  private selection: TrainingEventSelection[];
  private tempSelection: {[id: number]: TrainingEventSelection};

  constructor() {
    this.selection = [];
    this.tempSelection = {};
  }

  delete(event: TrainingEventSelection, drawer: TrainingEventRendererHelper = null) {
    event = this.get(event.id);
    if (event) {
      this.selection.splice(this.selection.indexOf(event), 1);
      if (drawer) {
        for (const cell of event.selectedCells) {
          drawer.unselectCell(cell);
        }
      }
      return UpdateAction.DELETED;
    }
    return null;
  }

  put(event: TrainingEventSelection, cells: any[], drawer: TrainingEventRendererHelper = null): UpdateAction {
    let updateAction: UpdateAction;
    if (!this.checkConflicts(event)) {
      updateAction = this.delete(event, drawer);
      event.selectedCells = cells;
      this.selection.push(event);
      if (drawer) {
        for (const cell of event.selectedCells) {
          drawer.selectCell(cell);
        }
        drawer.appendTrainingEventHTML(event.selectedCells[0], event.trainingEvent);
      }
      return updateAction ? UpdateAction.UPDATED : UpdateAction.INSERTED;
    } else {
      return UpdateAction.CONFLICT;
    }
  }

  get(id: number): TrainingEventSelection {
    return this.searchOnId(id);
  }

  private getOnStartFinishAndDay(event: TrainingEventSelection): TrainingEventSelection[] {
    return this.selection.filter( evt => evt.trainingEvent.eq(event.trainingEvent));
  }

  update(message: TrainingEventEditMessageModel, cells: any[], drawer: TrainingEventRendererHelper = null) {
    const event = this.searchTemporarySavedTrainingEvent(message.id);
    if (message.name === 'cancel') {
      return this.delete(event, drawer);
    } else {
      drawer.removeTrainingHTMLElement(event.selectedCells[0]);
      event.trainingEvent.trainingName = message.name;
      event.trainingEvent.timeSlot.start = message.start;
      event.trainingEvent.timeSlot.finish.hour = message.start.hour + 1;
      event.trainingEvent.timeSlot.finish.minute = message.start.minute;
      return this.put(event, cells, drawer);
    }
  }

  searchOnTime(timeSlot: TimeSlotModel): TrainingEventSelection[] {
      return this.selection.filter(trainingEventSelection =>
        trainingEventSelection.trainingEvent.timeSlot.eq(timeSlot));
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

  searchOnId(id: number): TrainingEventSelection {
    return this.selection.find(selection => selection.id === id);
  }

  private checkConflicts(event: TrainingEventSelection) {
    const timeSlot = event.trainingEvent.timeSlot;
    const id = event.id;
    const intersections = this.selection.filter(selection => selection.intersect(event))
      .filter(selection => selection.id !== id);

    if (timeSlot.start.toMinutes() < Settings.workDayStart.toMinutes()) {
      return true;
    } else if (timeSlot.start.toMinutes() + Settings.trainingDuration > Settings.workDayFinish.toMinutes()) {
      return true;
    } else if (intersections.length) {
      return true;
    }
    return false;
  }

  private searchTemporarySavedTrainingEvent(id: number): TrainingEventSelection {
    let evt = this.tempSelection[id];
    if (!evt) {
      evt = this.searchOnId(id);
    } else {
      delete this.tempSelection[id];
    }
    return evt;
  }

  saveTemporary(event: TrainingEventSelection) {
    this.tempSelection[event.id] = event;
  }

  refresh(root: Element, drawer: TrainingEventRendererHelper = null) {
    if (drawer) {
      for (const evt of this.selection) {
        const cells = [];
        let selector = '';
        const day = 'div[data-day="' + evt.trainingEvent.timeSlot.day + '"]';
        const start = '[data-starttime="' + evt.trainingEvent.timeSlot.start.toString() + '"]';
        selector = day + start;
        let cell = root.querySelector(selector);
        cells.push(cell);
        drawer.appendTrainingEventHTML(cell, evt.trainingEvent);

        const finish = '[data-finishtime="' + evt.trainingEvent.timeSlot.finish.toString() + '"]';
        selector = day + finish;
        cell = root.querySelector(selector);
        cells.push(cell);

        for (const _cell of cells) {
          drawer.selectCell(_cell);
        }
        evt.selectedCells = cells;
      }
    }
  }

  searchOnName(name: string): TrainingEventSelection {
    return this.selection.find(event => event.trainingEvent.trainingName === name);
  }

  private searchAllByName(name: string) {
    return this.selection.filter(event => event.trainingEvent.trainingName === name);
  }

  clean(name: string) {
    const toBeRemoved = this.searchAllByName(name);
    if (toBeRemoved.length > 0) {
      for (const event of toBeRemoved) {
        this.delete(event);
      }
    }
  }

  getByDay(day: string): TrainingEventSelection[] {
    return this.selection.filter( event => event.trainingEvent.timeSlot.day === day)
      .sort((o1, o2) => o1.compare(o2));
  }
}
