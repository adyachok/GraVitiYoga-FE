import {Component, TemplateRef, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {TrainingEvent} from '../model/training.event.model';
import {SetEventService} from '../services/set.event.service';
import {MarkEventService} from '../services/mark.event.service';
import {TrainingEventSelection} from '../model/training.event.selection.model';
import {TrainingEventEditMessageModel} from '../model/training.event.edit.message.model';


@Component({
  selector: 'app-set-event-modal',
  templateUrl: 'set.event.component.html'
})
export class SetEventModalComponent {

  @ViewChild('content')
  private modalTpl: TemplateRef<any>;
  private event: TrainingEventEditMessageModel;
  private preselectedTrainingName = 'Tренировка GraVitiYoga в группе';
  private chosenTrainingName = this.preselectedTrainingName;
  private edit = false;
  private tempEventStartTimeHolder: NgbTimeStruct;

  constructor(private modalService: NgbModal, private setEventService: SetEventService,
              private markEventService: MarkEventService) {
    this.setEventService.setEvent$.subscribe((event) => {
      this.event = event;
      if (event.name !== 'undefined') {
        this.chosenTrainingName = event.name;
        this.edit = true;
      }
      this.open(this.modalTpl); });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'Set event done') {
        this.updateSelectedTrainingEventTime();
        this.event.name = this.chosenTrainingName;
      } else if (result === 'Set event delete') {
        this.event.name = 'cancel';
      }
      this.markEventService.announceEventMarking(this.event);

      this.chosenTrainingName = this.preselectedTrainingName;
      this.edit = false;
      this.event = null;
      this.tempEventStartTimeHolder = null;
    }, (reason) => {
      // console.log('Dismissed ${this.getDismissReason(reason)}');
      this.edit = false;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  processSelectedTime(timeStruct: NgbTimeStruct) {
    this.tempEventStartTimeHolder = timeStruct;
  }

  updateSelectedTrainingEventTime() {
    if (this.tempEventStartTimeHolder) {
      this.event.start.hour = this.tempEventStartTimeHolder.hour;
      this.event.start.minute = this.tempEventStartTimeHolder.minute;
    }
  }
}
