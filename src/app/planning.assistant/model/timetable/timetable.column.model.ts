import {TimetableCellModel} from './timetable.cell.model';
import {Settings} from '../../../settings/settings';
import {TrainingEventRendererHelper} from '../../helper/renderer.helper';
import {ElementRef, Renderer2} from '@angular/core';
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
      const eventStartTime = TimeModelFactory.build(sibling.attributes['data-startTime'].value);
      const eventFinishTime = TimeModelFactory.build(sibling.attributes['data-finishTime'].value);
      const timeSlot = new TimeSlotModel(eventStartTime, eventFinishTime, this.day);
      const cell = new TimetableCellModel(timeSlot, sibling);
      this.cells.push(cell);
    }
  }

  getCell(startTime: number): TimetableCellModel {
    return this.cells.find(cell => {
      return cell.time.start.toMinutes() === startTime;
    });
  }

  getCellOnFinishTime(day: string, finishTime: number): TimetableCellModel {
    return this.cells.find(cell => cell.time.day === day && cell.time.start.toMinutes() === finishTime);
  }

  getCells(day: string, startTime: number, finishTime: number): ElementRef[] {
    const elArray = [];
    for (const t of this.getStartTimes(startTime)) {
      const cell = this.getCell(t);
      if (cell) {
        elArray.push(cell.el);
      }
    }
    return elArray;
  }

  private getStartTimes(startTime: number): number[] {
    const startTimes = [];
    for (let t = startTime; t < (startTime + Settings.trainingDuration); t += Settings.timeSlotInterval) {
      startTimes.push(t);
    }
    return startTimes;
  }
}
