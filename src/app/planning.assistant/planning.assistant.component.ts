import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SetEventService} from './services/set.event.service';


@Component({
  selector: 'app-planning-assistant',
  templateUrl: 'planning.assistant.component.html',
  styleUrls: ['planning.assistant.component.css'],
  providers: [SetEventService]
})
export class PlanningAssistantComponent implements OnInit {
  @Input() start = 8;
  @Input() stop = 21;
  @Input() step = 0.5;
  timeSlots: string[][];
  days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

  constructor(private modalService: NgbModal, private setEventSetvice: SetEventService) {}

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

    this.setEventSetvice.announceEventSetting({
      'startTime': eventStartTime,
      'finishTime': eventFinishTime,
      'weekDay': eventDay});
  }

  private setEventFinishTime(eventStartTime: string): string {
    const eventTimeArray = eventStartTime.split(':');
    let eventFinishTime =  Number(eventTimeArray[0]) + 1;
    if (eventFinishTime >= 24) {
      eventFinishTime = eventFinishTime - 24;
    }
    return eventFinishTime + ':' + eventTimeArray[1];
  }

  ngOnInit() {
    const timeSlotsNum = this.generator(this.start, this.stop, this.step);
    this.timeSlots = this.convertToTimeSlot(timeSlotsNum);
  }
}

