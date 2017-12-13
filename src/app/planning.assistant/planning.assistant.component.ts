import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SetEventService} from './services/set.event.service';
import {MarkEventService} from './services/mark.event.service';
import {TrainingEventRendererHelper} from './helper/renderer.helper';
import {CellsCounterHelper} from './helper/cells.counter.helper';
import {UpdateAction} from './update.action.enum';
import {TrainingEventSelectionFactory} from './model/training.event.selection.factory';
import {TrainingEventEditMessageModel} from './model/training.event.edit.message.model';
import {Settings} from '../settings/settings';
import {TrainingEventSelectionService} from './services/training.event.selection.service';
import {TimeModel} from './model/time.model';
import {TimetableService} from './model/timetable/timetable.service';


@Component({
  selector: 'app-planning-assistant',
  templateUrl: 'planning.assistant.component.html',
  styleUrls: ['planning.assistant.component.css'],
  providers: [SetEventService, MarkEventService, TimetableService]
})
export class PlanningAssistantComponent implements OnInit, AfterViewInit  {
  @ViewChild('timetable') el: ElementRef;
  private start = Settings.workDayStart.hour;
  private stop = Settings.workDayFinish.hour;
  private step = Settings.timeSlotInterval;
  private days = Settings.weekDays;
  private timeSlots: string[][];
  private rendererHelper: TrainingEventRendererHelper;
  private cellsCounterHelper: CellsCounterHelper;

  constructor(private modalService: NgbModal,
              private setEventService: SetEventService,
              private markEventService: MarkEventService,
              private renderer2: Renderer2,
              private trainingEventSelectionService: TrainingEventSelectionService,
              private timetable: TimetableService) {
    this.rendererHelper = new TrainingEventRendererHelper(renderer2);
    this.cellsCounterHelper = new CellsCounterHelper();

    this.markEventService.events$.subscribe((evt) => {
      this.onGetSelectedTrainingEvent(evt);
    });
  }

  private updateTrainingEvents(msg: TrainingEventEditMessageModel): UpdateAction {
    const newSelectedCells = this.timetable.getCells(msg.day,
      msg.start.toMinutes(),
      new TimeModel(msg.start.hour + 1, msg.start.minute).toMinutes());
    return this.trainingEventSelectionService.update(msg, newSelectedCells, this.rendererHelper);
  }

  timeSlotClick(evt: any) {
    this.timetable.feed(evt);
    let eventObj = this.trainingEventSelectionService.searchOnCellClicked(evt);
    if (!eventObj) {
      eventObj = TrainingEventSelectionFactory.build(evt);
      this.trainingEventSelectionService.saveTemporary(eventObj);
    }
    const message = new TrainingEventEditMessageModel(eventObj.id,
      eventObj.trainingEvent.timeSlot.start,
      eventObj.trainingEvent.trainingName,
      eventObj.trainingEvent.timeSlot.day);
    this.setEventService.announce(message);
  }

  private onGetSelectedTrainingEvent(message: TrainingEventEditMessageModel) {
    switch (this.updateTrainingEvents(message)) {
      case UpdateAction.DELETED:
        console.log('DELETED:)');
        break;
      case UpdateAction.INSERTED:
        console.log('INSERTED:)');
        break;
      case UpdateAction.UPDATED:
        console.log('UPDATED:)');
        break;
      case UpdateAction.CONFLICT:
        console.log('KONFLIKT:)');
    }
  }

  ngOnInit() {
    this.timeSlots = this.cellsCounterHelper.buidTimeSlots(this.start, this.stop, this.step);
  }

  ngAfterViewInit() {
    const root = <Element>this.el.nativeElement;
    this.trainingEventSelectionService.refresh(root, this.rendererHelper);
  }
}

