import {TimetableColumnModel} from './timetable.column.model';
import {ElementRef, Renderer2} from '@angular/core';
import {TrainingEventRendererHelper} from '../../helper/renderer.helper';
import {TimetableCellModel} from './timetable.cell.model';

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

  cetCellOnFinishTime(day: string, finishTime: number): TimetableCellModel {
    const column = this.columns.find(col => col.day === day);
    if (column) {
      return column.getCellOnFinishTime(day, finishTime);
    }
    return null;
  }

  getCells(day: string, startTime: number, finishTime: number): ElementRef[] {
    const column = this.columns.find(col => col.day === day);
    let cells = [];
    if (column) {
      cells = column.getCells(day, startTime, finishTime);
    }
    return cells;
  }

  feed(event: any) {
    const target = event.currentTarget;
    const eventDay = target.attributes['data-day'].value;
    if (!this.findColumnByDay(eventDay)) {
      this.columns.push(new TimetableColumnModel(event, this.renderer));
    }
  }

  private findColumnByDay(day: string): TimetableColumnModel {
    return this.columns.find(col => col.day === day);
  }
}
