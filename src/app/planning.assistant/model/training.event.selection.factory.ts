import {TrainingEventSelection} from './training.event.selection.model';
import {ElementRef} from '@angular/core';
import {TimeModelFactory} from './time.model.factory';



export class TrainingEventSelectionFactory {

  static build (event: any) {
    const trainingEventSelection = TrainingEventSelectionFactory.prepareTrainingEventObject(event);
    const finishTime = trainingEventSelection.trainingEvent.finishTime;
    const selectedCells = TrainingEventSelectionFactory.getTrainingEventSelectedCells(event, finishTime.toString());
    trainingEventSelection.selectedCells = selectedCells;
    return trainingEventSelection;
  }

  private static prepareTrainingEventObject(event: any): TrainingEventSelection {
    const eventTarget = event.currentTarget;
    const eventStartTime = eventTarget.attributes['data-startTime'].value;
    const eventFinishTime = this.setEventFinishTime(eventStartTime);
    const eventDay = eventTarget.attributes['data-day'].value;

    const cellClass = eventTarget.attributes['class'].value;
    const trainingEvent = {
      'trainingName': 'undefined',
      'startTime': TimeModelFactory.build(eventStartTime),
      'finishTime': TimeModelFactory.build(eventFinishTime),
      'weekDay': eventDay
      };
    // TODO: move logic to get selected
    // if (cellClass) {
    //   const cellClasses = cellClass.split(' ');
    //   for (const item of cellClasses) {
    //     if (item === 'selected') {
    //       // Check if cell is start event cell
    //       // TODO: modify logic for event name search
    //       const eventName = eventTarget.attributes['data-training-name'];
    //       if (!eventName) {
    //         const events = this.searchTrainingEvent(eventTarget.attributes['data-finishTime'].value, eventDay);
    //         if (events.length) {
    //           eventObj = events[0];
    //         }
    //       }
    //       break;
    //     }
    //   }
    // }
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
