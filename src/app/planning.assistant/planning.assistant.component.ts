import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SetEventService} from './services/set.event.service';
import {MarkEventService} from './services/mark.event.service';
import {TrainingEvent} from './model/training.event.model';
import {TrainingEventRendererHelper} from './helper/renderer.helper';
import {CellsCounterHelper} from './helper/cells.counter.helper';
import {UpdateAction} from './update.action.enum';
import {TrainingEventsSelections} from './model/training.events.selections';
import {TrainingEventSelectionFactory} from './model/training.event.selection.factory';
import {TrainingEventSelection} from './model/training.event.selection.model';


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
  days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  private eventTarget: any;
  private rendererHelper: TrainingEventRendererHelper;
  private cellsCounterHelper: CellsCounterHelper;
  private selectedTrainingEvents: TrainingEventsSelections;

  constructor(private modalService: NgbModal, private setEventService: SetEventService,
              private markEventService: MarkEventService, private renderer2: Renderer2) {
    this.rendererHelper = new TrainingEventRendererHelper(renderer2);
    this.cellsCounterHelper = new CellsCounterHelper();

    this.markEventService.markEvent$.subscribe((evt) => {
      this.onGetSelectedTrainingEvent(evt, this.eventTarget);
    });
  }

  private updateTrainingEvents(trainingEvt: TrainingEventSelection): UpdateAction {
    const training = this.selectedTrainingEvents.get(trainingEvt);
    if (!training) {
      this.selectedTrainingEvents.put(trainingEvt, this.rendererHelper);
      return UpdateAction.INSERTED;
    } else {
      if (trainingEvt.trainingEvent.trainingName === 'cancel') {
        this.selectedTrainingEvents.delete(trainingEvt, this.rendererHelper);
        return UpdateAction.DELETED;
      } else {
        this.selectedTrainingEvents.put(trainingEvt, this.rendererHelper);
        return UpdateAction.UPDATED;
      }
    }
  }

  timeSlotClick(evt: any) {
    let eventObj = this.selectedTrainingEvents.searchOnCellClicked(evt);
    if (!eventObj) {
      eventObj = TrainingEventSelectionFactory.build(evt);
    }
    this.setEventService.announceEventSetting(eventObj);
  }

  private onGetSelectedTrainingEvent(trainingEvt: TrainingEventSelection, target: ElementRef) {
    switch (this.updateTrainingEvents(trainingEvt)) {
      case UpdateAction.DELETED:
        this.rendererHelper.removeTrainingHTMLElement(trainingEvt.selectedCells[0]);
        break;
      case UpdateAction.INSERTED:
        let html = this.rendererHelper.buildTrainingHTMLElement(trainingEvt.trainingEvent);
        this.rendererHelper.appendTrainingEventHTML(trainingEvt.selectedCells[0], html);
        break;
      case UpdateAction.UPDATED:
        this.rendererHelper.removeTrainingHTMLElement(trainingEvt.selectedCells[0]);
        html = this.rendererHelper.buildTrainingHTMLElement(trainingEvt.trainingEvent);
        this.rendererHelper.appendTrainingEventHTML(trainingEvt.selectedCells[0], html);
    }
  }

  // private addMarkCellWithTrainingName(eventTarget: ElementRef, trainingEvent: TrainingEvent): void {
  //   const firstSelectedCell = this.getEventCells(eventTarget, trainingEvent)[0];
  //   const trainingHTML = this.rendererHelper.buildTrainingHTMLElement(trainingEvent);
  //   this.rendererHelper.appendTrainingEventHTML(eventTarget, trainingHTML);
  // }
  //
  // private markEventCellsBusy(eventTarget: ElementRef, trainingEvent: TrainingEvent): void {
  //   // Sets background class of event cells
  //   const cells = this.getEventCells(eventTarget, trainingEvent);
  //   for (const cell of cells) {
  //     this.rendererHelper.selectCell(cell);
  //   }
  // }
  //
  // private unmarkEventCellsBusy(eventTarget: any, event: TrainingEvent): void {
  //   // Unsets background class of event cells
  //   const cells = this.getEventCells(eventTarget, event);
  //   for (const cell of cells) {
  //     this.rendererHelper.unselectCell(cell);
  //   }
  // }
  //
  // private getEventCells(eventTarget: any, event: TrainingEvent): ElementRef[] {
  //   const cells = [eventTarget];
  //   let goBackInTime = false;
  //   if (eventTarget.attributes['data-startTime'].value !== event.startTime) {
  //     goBackInTime = true;
  //   }
  //   while (true) {
  //     const nextSibling = eventTarget.nextElementSibling;
  //     if (nextSibling && nextSibling.attributes['data-startTime'].value !== event.finishTime) {
  //       cells.push(nextSibling);
  //       eventTarget = nextSibling;
  //     } else {
  //       break;
  //     }
  //   }
  //   if (goBackInTime) {
  //     while (true) {
  //       const prevSibling = eventTarget.previousElementSibling;
  //       if (prevSibling && prevSibling.attributes['data-startTime'].value !== event.startTime) {
  //         cells.push(prevSibling);
  //         eventTarget = prevSibling;
  //       } else {
  //         break;
  //       }
  //     }
  //   }
  //   return cells;
  // }

  ngOnInit() {
    this.timeSlots = this.cellsCounterHelper.buidTimeSlots(this.start, this.stop, this.step);
    this.selectedTrainingEvents = new TrainingEventsSelections();
  }
}

