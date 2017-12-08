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
import {TrainingEventEditMessageModel} from './model/training.event.edit.message.model';
import {TimeModel} from './model/time.model';


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
  private  tempSelectedTrainingEvents: {[id: number]: TrainingEventSelection};
  private planningTableCells: {[day: string]: {[startTime: number]: ElementRef }}

  constructor(private modalService: NgbModal, private setEventService: SetEventService,
              private markEventService: MarkEventService, private renderer2: Renderer2) {
    this.rendererHelper = new TrainingEventRendererHelper(renderer2);
    this.cellsCounterHelper = new CellsCounterHelper();

    this.markEventService.markEvent$.subscribe((evt) => {
      this.onGetSelectedTrainingEvent(evt, this.eventTarget);
    });
  }

  private updateTrainingEvents(evt: TrainingEventSelection, msg: TrainingEventEditMessageModel): UpdateAction {
    const training = this.selectedTrainingEvents.get(evt.id);
    if (!training) {
      evt.trainingEvent.trainingName = msg.name;
      this.selectedTrainingEvents.put(evt, this.rendererHelper);
      return UpdateAction.INSERTED;
    } else {
      if (msg.name === 'cancel') {
        this.selectedTrainingEvents.delete(evt, this.rendererHelper);
        return UpdateAction.DELETED;
      } else {
        if (this.checkConflicts(msg)) {
          return UpdateAction.CONFLICT;
        }
        evt.trainingEvent.trainingName = msg.name;
        evt.trainingEvent.timeSlot.start = msg.start;
        evt.trainingEvent.timeSlot.finish.hour = msg.start.hour + 1;
        evt.trainingEvent.timeSlot.finish.minute = msg.start.minute;
        this.selectedTrainingEvents.put(evt, this.rendererHelper);
        return UpdateAction.UPDATED;
      }
    }
  }

  private checkConflicts(msg: TrainingEventEditMessageModel) {
    const evt = TrainingEventSelectionFactory.buildFormData(msg.name, msg.start.hour, msg.start.minute, msg.day);
    const conflicts = this.selectedTrainingEvents.selection.filter(selection => selection.intersect(evt) &&
      msg.id !== selection.id);
    return conflicts.length > 0;
  }

  timeSlotClick(evt: any) {
    // TODO: better cell selection logic
    let eventObj = this.selectedTrainingEvents.searchOnCellClicked(evt);
    if (!eventObj) {
      eventObj = TrainingEventSelectionFactory.build(evt);
      this.tempSelectedTrainingEvents[eventObj.id] = eventObj;
    }
    const message = new TrainingEventEditMessageModel(eventObj.id, eventObj.trainingEvent.timeSlot.start,
      eventObj.trainingEvent.trainingName, eventObj.trainingEvent.timeSlot.day);
    this.setEventService.announceEventSetting(message);
  }

  private onGetSelectedTrainingEvent(message: TrainingEventEditMessageModel, target: ElementRef) {
    const evt = this.getSelectedTrainingEvent(message);
    switch (this.updateTrainingEvents(evt, message)) {
      case UpdateAction.DELETED:
        this.rendererHelper.removeTrainingHTMLElement(evt.selectedCells[0]);
        break;
      case UpdateAction.INSERTED:
        let html = this.rendererHelper.buildTrainingHTMLElement(evt.trainingEvent);
        this.rendererHelper.appendTrainingEventHTML(evt.selectedCells[0], html);
        break;
      case UpdateAction.UPDATED:
        this.rendererHelper.removeTrainingHTMLElement(evt.selectedCells[0]);
        html = this.rendererHelper.buildTrainingHTMLElement(evt.trainingEvent);
        this.rendererHelper.appendTrainingEventHTML(evt.selectedCells[0], html);
        break;
      case UpdateAction.CONFLICT:
        console.log('KONFLIKT:)');
    }
  }

  private getSelectedTrainingEvent(message: TrainingEventEditMessageModel): TrainingEventSelection {
    let evt = this.tempSelectedTrainingEvents[message.id];
    if (!evt) {
      evt = this.selectedTrainingEvents.searchOnId(message.id);
    } else {
      delete this.tempSelectedTrainingEvents[message.id];
    }
    return evt;
  }

  ngOnInit() {
    this.timeSlots = this.cellsCounterHelper.buidTimeSlots(this.start, this.stop, this.step);
    this.selectedTrainingEvents = new TrainingEventsSelections();
    this.tempSelectedTrainingEvents = {};
  }
}

