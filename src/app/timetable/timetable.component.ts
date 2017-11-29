import {Component, Input, OnInit} from '@angular/core';
import {SetEventService} from './services/set.event.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timetable',
  styleUrls: ['timetable.component.css'],
  templateUrl: 'timetable.component.html',
  providers: [SetEventService]
})
export class TimetableComponent implements OnInit {
  @Input() start: number;
  @Input() stop: number;
  @Input() step: number;
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

  timeslotClick(event: any) {
    const target = event.target;
    const eventStartTime = target.attributes['data-startTime'].value;
    const eventFinishTime = target.attributes['data-finishTime'].value;
    const eventDay = target.attributes['data-day'].value;

    this.setEventSetvice.announceEventSetting({
      'startTime': eventStartTime,
      'finishTime': eventFinishTime,
      'weekDay': eventDay});
  }

  ngOnInit() {
    const timeSlotsNum = this.generator(this.start, this.stop, this.step);
    this.timeSlots = this.convertToTimeSlot(timeSlotsNum);
  }
}
