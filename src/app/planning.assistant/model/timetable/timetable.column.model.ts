import {TimetableCellModel} from './timetable.cell.model';
import {Settings} from '../../../settings/settings';
import {TrainingEventRendererHelper} from '../../helper/renderer.helper';
import {Renderer2} from '@angular/core';
import {TimeModelFactory} from '../time.model.factory';
import {CellsCounterHelper} from '../../helper/cells.counter.helper';
import {TimeSlotModel} from '../time.slot.model';

export class TimetableColumnModel {
  cells: TimetableCellModel[];
  day: string;
  private rendererHelper: TrainingEventRendererHelper;

  constructor(event: any, renderer: TrainingEventRendererHelper) {
    this.cells = [];
    const eventTarget = event.currentTarget;
    this.day = eventTarget.attributes['data-day'].value;
    this.rendererHelper = renderer;
    const siblings = this.rendererHelper.getSiblings(event.currentTarget);
    for (const sibling of siblings) {
      const eventStartTime = TimeModelFactory.build(eventTarget.attributes['data-startTime'].value);
      const eventFinishTime = TimeModelFactory.build(eventTarget.attributes['data-finishTime'].value);
      const timeSlot = new TimeSlotModel(eventStartTime, eventFinishTime, this.day);
      const cell = new TimetableCellModel(timeSlot, sibling);
      this.cells.push(cell);
    }
  }

  getCell(startTime: number) {
    return this.cells.find(cell => cell.time.start.toMinutes() === startTime);
  }

  cetCellOnFinishTime(day: string, finishTime: number) {
    return this.cells.find(cell => cell.time.day === day && cell.time.start.toMinutes() === finishTime);
  }

  getCells(day: string, startTime: number, finishTime: number) {
    this.getStartTimes(startTime);
  }

  private getStartTimes(startTime: number) {
    for (let t = startTime; t < (startTime + Settings.trainingDuration); t += Settings.timeSlotInterval) {
      this.getCell(t);
    }
  }
}
