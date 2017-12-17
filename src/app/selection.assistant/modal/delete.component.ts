import {Component, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TrainingSelectUndoService} from '../service/training.select.undo.service';


@Component({
  selector: 'app-del',
  templateUrl: 'delete.component.html'
})
export class DeleteModalComponent {
  @Input() name: string;
  @Input() deleteConflict: boolean;

  constructor(private modalService: NgbModal, private trainingSelectUndoService: TrainingSelectUndoService) {}

  open(content) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'Unselection done') {
        this.trainingSelectUndoService.announce(true);
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
