import {Component, ElementRef, Input, OnInit, Renderer, Renderer2} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SetEventService} from './services/set.event.service';
import {MarkEventService} from './services/mark.event.service';
import {TrainingEvent} from './model/training.event.model';


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
  private timeSlots: string[][];
  private trainingEvents: TrainingEvent[];
  days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  private eventTarget: any;

  constructor(private modalService: NgbModal, private setEventService: SetEventService,
              private markEventService: MarkEventService, private renderer2: Renderer2) {
    this.markEventService.markEvent$.subscribe((evt) => {
      this.onGetSelectedTrainingEvent(evt, this.eventTarget);
      this.updateTrainingEvents(evt);
    });
  }

  private updateTrainingEvents(trainingEvt: TrainingEvent) {
    const filteredTrainings = this.getTrainingEvent(trainingEvt);
    if (!filteredTrainings.length) {
      this.trainingEvents.push(trainingEvt);
    } else {
      if (trainingEvt.trainingName === 'cancel') {
        const idx = this.trainingEvents.indexOf(filteredTrainings[0]);
        if (!idx || idx < 0) {
          console.log('Error deletion of element');
        } else {
          this.trainingEvents.splice(idx, 1);
        }
      }
    }
  }

  private getTrainingEvent(trainingEvt: TrainingEvent): TrainingEvent[] {
    return this.trainingEvents.filter(evt =>  (evt.startTime === trainingEvt.startTime &&
      evt.finishTime === trainingEvt.finishTime && evt.weekDay === trainingEvt.weekDay));
  }

  private searchTrainingEvent(time: string, day: string) {
    let filteredTrainings = this.trainingEvents.filter(evt =>  (evt.startTime === time &&
      evt.weekDay === day));
    if (!filteredTrainings.length) {
      filteredTrainings = this.trainingEvents.filter(evt =>  (evt.finishTime === time &&
        evt.weekDay === day));
    }
    return filteredTrainings;
  }

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

  timeSlotClick(evt: any) {
    this.eventTarget = evt.currentTarget;
    const eventStartTime = this.eventTarget.attributes['data-startTime'].value;
    const eventFinishTime = this.setEventFinishTime(eventStartTime);
    const eventDay = this.eventTarget.attributes['data-day'].value;

    const cellClass = this.eventTarget.attributes['class'].value;
    let eventObj = {
      'trainingName': 'undefined',
      'startTime': eventStartTime,
      'finishTime': eventFinishTime,
      'weekDay': eventDay
    };
    if (cellClass) {
      const cellClasses = cellClass.split(' ');
      for (const item of cellClasses) {
        if (item === 'selected') {
          // TODO: should trigger edit and delete logic for event

          // Check if cell is start event cell
          const eventName = this.eventTarget.attributes['data-training-name'];
          if (!eventName) {
            const events = this.searchTrainingEvent(this.eventTarget.attributes['data-finishTime'].value, eventDay);
            if (events.length) {
              eventObj = events[0];
            }
          }
          break;
        }
      }
    }
    this.setEventService.announceEventSetting(eventObj);
  }

  private onGetSelectedTrainingEvent(trainingEvent: TrainingEvent, target: ElementRef) {
    // TODO: check logic
    // TODO: event border logic
    // TODO: unselect logic
    this.addMarkCellWithTrainingName(target, trainingEvent);
    this.markEventCellsBusy(target, trainingEvent);
    this.setDataTrainingElement(target, trainingEvent);
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

  private addMarkCellWithTrainingName(eventTarget: ElementRef, trainingEvent: TrainingEvent): void {
    const firstSelectedCell = this.getEventCells(eventTarget, trainingEvent.finishTime)[0];
    const trainingHTML = this.buildTrainingHTMLElement(trainingEvent);
    this.appendTrainingEventHTML(eventTarget, trainingHTML);
  }

  private markEventCellsBusy(eventTarget: ElementRef, trainingEvent: TrainingEvent): void {
    // Sets background class of event cells
    const cells = this.getEventCells(eventTarget, trainingEvent.finishTime);
    for (const cell of cells) {
      this.selectCell(cell);
    }
  }

  private unmarkEventCellsBusy(eventTarget: any, eventFinishTime: string): void {
    // Unsets background class of event cells
    const cells = this.getEventCells(eventTarget, eventFinishTime);
    for (const cell of cells) {
      this.unselectCell(cell);
    }
  }

  private getEventCells(eventTarget: any, eventFinishTime: string): ElementRef[] {
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
    this.renderer2.addClass(cell, 'selected');
  }

  private unselectCell(cell: any): void {
    this.renderer2.removeClass(cell, 'selected');
  }

  private buildTrainingHTMLElement(trainingEvent: TrainingEvent): ElementRef {
    const row = this.renderer2.createElement('div');
    this.renderer2.addClass(row, 'row');

    const col = this.renderer2.createElement('div');
    this.renderer2.addClass(col, 'col-sm-12');
    const text = this.renderer2.createText(trainingEvent.trainingName);
    this.renderer2.appendChild(col, text);

    this.renderer2.appendChild(row, col);
    return row;
  }

  private appendTrainingEventHTML(eventTarget: ElementRef, trainingEventHTML: ElementRef) {
    this.renderer2.appendChild(eventTarget, trainingEventHTML);
  }

  private setDataTrainingElement(eventTarget: ElementRef, trainingEvt: TrainingEvent) {
    this.renderer2.setAttribute(this.eventTarget, 'data-training-name', trainingEvt.trainingName);
  }

  ngOnInit() {
    const timeSlotsNum = this.generator(this.start, this.stop, this.step);
    this.timeSlots = this.convertToTimeSlot(timeSlotsNum);
    this.trainingEvents = [];
  }
}

