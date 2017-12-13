import {TimetableColumnModel} from './timetable.column.model';
import {ElementRef, Injectable} from '@angular/core';
import {TimetableCellModel} from './timetable.cell.model';

Injectable()
export class TimetableService {
  columns: TimetableColumnModel[];

  constructor() {
    this.columns = [];
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
      this.columns.push(new TimetableColumnModel(event));
    }
  }

  private findColumnByDay(day: string): TimetableColumnModel {
    return this.columns.find(col => col.day === day);
  }
}
