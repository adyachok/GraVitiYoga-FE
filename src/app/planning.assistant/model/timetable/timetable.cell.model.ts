import {TimeSlotModel} from '../time.slot.model';
import {ElementRef} from '@angular/core';

export class TimetableCellModel {
  time: TimeSlotModel;
  el: ElementRef;

  constructor(time: TimeSlotModel, el: ElementRef) {
    this.time = time;
    this.el = el;
  }
}
