import {Component, TemplateRef, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {TrainingEvent} from '../model/training.event.model';
import {SetEventService} from '../services/set.event.service';
import {MarkEventService} from '../services/mark.event.service';
import {TrainingEventSelection} from '../model/training.event.selection.model';
import {TrainingEventEditMessageModel} from '../model/training.event.edit.message.model';
import {TrainingSelectService} from '../../selection.assistant/service/training.select.service';
import {SelectedTraining} from '../../fit.assistant/model/selected.training.model';


@Component({
  selector: 'app-set-event-modal',
  templateUrl: 'set.event.component.html'
})
export class SetEventModalComponent {

  @ViewChild('content')
  private modalTpl: TemplateRef<any>;
  private event: TrainingEventEditMessageModel;
  private preselectedTrainingName: string;
  private chosenTrainingName: string;
  private edit = false;
  private tempEventStartTimeHolder: NgbTimeStruct;
  private selectedTrainingNames: string[];
  private disableSaveButton = false;

  constructor(private modalService: NgbModal,
              private setEventService: SetEventService,
              private markEventService: MarkEventService,
              private trainingSelectService: TrainingSelectService) {
    this.setEventService.events$.subscribe((event) => {
      this.event = event;
      if (event.name !== 'undefined') {
        this.chosenTrainingName = event.name;
        this.edit = true;
      }
      this.open(this.modalTpl); });
    this.selectedTrainingNames = trainingSelectService.names();
    this.preselectedTrainingName = this.selectedTrainingNames.length ? this.selectedTrainingNames[0] : '';
    this.chosenTrainingName = this.preselectedTrainingName;
    if (!this.preselectedTrainingName) {
      this.disableSaveButton = true;
    }
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'Set event done') {
        if (!this.chosenTrainingName) {
          return;
        }
        this.updateSelectedTrainingEventTime();
        this.event.name = this.chosenTrainingName;
        this.markEventService.announce(this.event);
      } else if (result === 'Set event delete') {
        this.event.name = 'cancel';
        this.markEventService.announce(this.event);
      }
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
