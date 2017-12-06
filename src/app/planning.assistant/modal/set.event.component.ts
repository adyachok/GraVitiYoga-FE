import {Component, TemplateRef, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TrainingEvent} from '../model/training.event.model';
import {SetEventService} from '../services/set.event.service';
import {MarkEventService} from '../services/mark.event.service';
import {TrainingEventSelection} from '../model/training.event.selection.model';


@Component({
  selector: 'app-set-event-modal',
  templateUrl: 'set.event.component.html'
})
export class SetEventModalComponent {

  @ViewChild('content')
  private modalTpl: TemplateRef<any>;
  private event: TrainingEventSelection;
  private preselectedTrainingName = 'Tренировка GraVitiYoga в группе';
  private chosenTrainingName = this.preselectedTrainingName;
  private edit = false;

  constructor(private modalService: NgbModal, private setEventService: SetEventService,
              private markEventService: MarkEventService) {
    this.setEventService.setEvent$.subscribe((event) => {
      this.event = event;
      if (event.trainingEvent.trainingName !== 'undefined') {
        this.chosenTrainingName = event.trainingEvent.trainingName;
        this.edit = true;
      }
      this.open(this.modalTpl); });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'Set event done') {
        this.event.trainingEvent.trainingName = this.chosenTrainingName;
      } else if (result === 'Set event delete') {
        this.event.trainingEvent.trainingName = 'cancel';
      }
      this.markEventService.announceEventMarking(this.event);
      this.chosenTrainingName = this.preselectedTrainingName;
      this.edit = false;
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
}
