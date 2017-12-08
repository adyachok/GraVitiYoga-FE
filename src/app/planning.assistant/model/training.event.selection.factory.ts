import {TrainingEventSelection} from './training.event.selection.model';
import {ElementRef} from '@angular/core';
import {TimeModelFactory} from './time.model.factory';
import {TimeSlotModel} from './time.slot.model';
import {TrainingEvent} from './training.event.model';
import {TimeModel} from './time.model';



export class TrainingEventSelectionFactory {

  static build (event: any) {
    const trainingEventSelection = TrainingEventSelectionFactory.prepareTrainingEventObject(event);
    const finishTime = trainingEventSelection.trainingEvent.timeSlot.finish;
    trainingEventSelection.selectedCells = TrainingEventSelectionFactory.getTrainingEventSelectedCells(event,
      finishTime.toString());
    return trainingEventSelection;
  }

  static buildFormData (name: string, startHour: number, startMinute: number, day: string) {
    const start = new TimeModel(startHour, startMinute);
    const finish = new TimeModel(startHour + 1, startMinute);
    const timeSlot = new TimeSlotModel(start, finish, day);
    const evt = new TrainingEvent(name, timeSlot);
    return new TrainingEventSelection(evt);
  }

  private static prepareTrainingEventObject(event: any): TrainingEventSelection {
    const eventTarget = event.currentTarget;
    const eventStartTime = eventTarget.attributes['data-startTime'].value;
    const eventFinishTime = this.setEventFinishTime(eventStartTime);
    const eventDay = eventTarget.attributes['data-day'].value;

    const timeSlot = new TimeSlotModel(TimeModelFactory.build(eventStartTime),
      TimeModelFactory.build(eventFinishTime), eventDay);
    const trainingEvent = new TrainingEvent('undefined', timeSlot);
    return new TrainingEventSelection(trainingEvent);
  }

  private static setEventFinishTime(eventStartTime: string): string {
    const eventTimeArray = eventStartTime.split(':');
    // Event should take one hour (no more no less)
    let eventFinishTime =  Number(eventTimeArray[0]) + 1;
    if (eventFinishTime >= 24) {
      eventFinishTime = eventFinishTime - 24;
    }
    return eventFinishTime + ':' + eventTimeArray[1];
  }

  private static getTrainingEventSelectedCells(event: any, eventFinishTime: string): ElementRef[] {
    let eventTarget = event.currentTarget;
    const selectedCells = [];
    selectedCells.push(eventTarget);
     while (true) {
      const sibling = eventTarget.nextElementSibling;
      if (!sibling) {
        break;
      }
      const startTime = sibling.attributes['data-startTime'].value;
      if (startTime === eventFinishTime) {
        break;
      }
      selectedCells.push(sibling);
      eventTarget = sibling;
    }
    return selectedCells;
  }
}
