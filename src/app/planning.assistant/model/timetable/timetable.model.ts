import {TimetableColumnModel} from './timetable.column.model';
import {Renderer2} from '@angular/core';
import {TrainingEventRendererHelper} from '../../helper/renderer.helper';

export class TimetableModel {
  columns: TimetableColumnModel[];
  renderer: TrainingEventRendererHelper;

  constructor(renderer: TrainingEventRendererHelper) {
    this.columns = [];
    this.renderer = renderer;
  }

  getCell(day: string, startTime: number) {
    const column = this.columns.find(col => col.day === day);
    if (column) {
      column.getCell(startTime);
    }
  }

  cetCellOnFinishTime(day: string, finishTime: number) {
    const column = this.columns.find(col => col.day === day);
    if (column) {
      column.cetCellOnFinishTime(day, finishTime);
    }
  }

  getCells(day: string, startTime: number, finishTime: number) {
    const column = this.columns.find(col => col.day === day);
    if (column) {
      column.getCells(day, startTime, finishTime);
    }
  }

  feed(event: any) {
    const target = event.currentTarget;
    const eventDay = target.attributes['data-day'].value;
    if (!this.findColumnByDay(eventDay)) {
      this.columns.push(new TimetableColumnModel(event, this.renderer));
    }
    console.log(this);
  }

  private findColumnByDay(day: string): TimetableColumnModel {
    return this.columns.find(col => col.day === day);
  }
}
