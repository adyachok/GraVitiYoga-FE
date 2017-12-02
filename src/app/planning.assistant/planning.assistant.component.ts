import {Component, Input, OnInit, Renderer, Renderer2} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SetEventService} from './services/set.event.service';
import {MarkEventService} from './services/mark.event.service';


@Component({
  selector: 'app-planning-assistant',
  templateUrl: 'planning.assistant.component.html',
  styleUrls: ['planning.assistant.component.css'],
  providers: [SetEventService, MarkEventService]
})
export class PlanningAssistantComponent implements OnInit {
  @Input() start = 8;
  @Input() stop = 21;
  @Input() step = 0.5;
  timeSlots: string[][];
  days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

  constructor(private modalService: NgbModal, private setEventService: SetEventService,
              private renderer: Renderer, private markEventService: MarkEventService) {}

  private generator(start, stop, step: number): number[][] {
    let previous_timeslot = start;
    const time_slots = [];
    for (let i = start; i <= stop; i += step) {
      if (previous_timeslot !== i) {
        time_slots.push([previous_timeslot, i]);
        previous_timeslot = i;
      } else {
        previous_timeslot = i;
      }
    }
    return time_slots;
  }

  private convertToTimeSlot(timeSlotsArray: number[][]): string[][] {
    // Supports timeslots of 15 and 30 minutes
    const timeSlots = [];
    for ( const i of timeSlotsArray) {
      const timeSlot = [];
      for ( const j of i) {
        const whole =  Math.floor(j);
        const rest =  j % whole;
        let minutes = '00';

        switch (rest) {
          case 0.25 : minutes = '15';
            break;
          case 0.50 : minutes = '30';
            break;
          case 0.75: minutes = '45';
        }
        const _time = whole + ':' + minutes;
        timeSlot.push(_time);
      }
      timeSlots.push(timeSlot);
    }
    return timeSlots;
  }

  timeSlotClick(event: any) {
    const target = event.target;
    const eventStartTime = target.attributes['data-startTime'].value;
    const eventFinishTime = this.setEventFinishTime(eventStartTime);
    const eventDay = target.attributes['data-day'].value;

    // this.markEventCellsBusy(target, eventFinishTime);
    // this.renderer.setElementClass(target.nextElementSibling, 'selected', false);

    this.setEventService.announceEventSetting({
      'startTime': eventStartTime,
      'finishTime': eventFinishTime,
      'weekDay': eventDay});

    this.markEventService.markEvent$.subscribe((evt) => {
      // TODO: check logic
      // TODO: event border logic
      // TODO: unselect logic
      this.markEventCellsBusy(target, eventFinishTime);
    });
  }

  private setEventFinishTime(eventStartTime: string): string {
    const eventTimeArray = eventStartTime.split(':');
    // Event should take one hour (no more no less)
    let eventFinishTime =  Number(eventTimeArray[0]) + 1;
    if (eventFinishTime >= 24) {
      eventFinishTime = eventFinishTime - 24;
    }
    return eventFinishTime + ':' + eventTimeArray[1];
  }

  private markEventCellsBusy(eventTarget: any, eventFinishTime: string): void {
    // Sets background class of event cells
    const cells = this.getEventCells(eventTarget, eventFinishTime);
    for (const cell of cells) {
      this.renderer.setElementClass(cell, 'selected', true);
    }
  }

  private unmarkEventCellsBusy(eventTarget: any, eventFinishTime: string): void {
    // Unsets background class of event cells
    const cells = this.getEventCells(eventTarget, eventFinishTime);
    for (const cell of cells) {
      this.renderer.setElementClass(cell, 'selected', false);
    }
  }

  private getEventCells(eventTarget: any, eventFinishTime: string): any[] {
    const cells = [eventTarget];
    while (true) {
      const nextSibling = eventTarget.nextElementSibling;
      if (nextSibling && nextSibling.attributes['data-startTime'].value !== eventFinishTime) {
        cells.push(nextSibling);
        eventTarget = nextSibling;
      } else {
        break;
      }
    }
    return cells;
  }

  private selectCell(cell: any): void {
    // Cell is event.target.nextElementSibling
    this.renderer.setElementClass(cell, 'selected', true);
  }

  private unselectCell(cell: any): void {
    this.renderer.setElementClass(cell, 'selected', false);
  }

  ngOnInit() {
    const timeSlotsNum = this.generator(this.start, this.stop, this.step);
    this.timeSlots = this.convertToTimeSlot(timeSlotsNum);
  }
}

