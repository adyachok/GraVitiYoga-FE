import {Component, Input, TemplateRef, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TrainingEvent} from '../model/training.event.model';
import {SetEventService} from '../services/set.event.service';


@Component({
  selector: 'app-set-event-modal',
  templateUrl: 'set.event.component.html'
})
export class SetEventModalComponent {

  @ViewChild('content')
  private modalTpl: TemplateRef<any>;
  private event: TrainingEvent;

  constructor(private modalService: NgbModal, private setEventService: SetEventService) {
    this.setEventService.setEvent$.subscribe((event) => {
      this.event = event;
      this.open(this.modalTpl); });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'Set event done') {
        console.log('Training time selection is done');
      }
    }, (reason) => {
      console.log('Dismissed ${this.getDismissReason(reason)}');
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
