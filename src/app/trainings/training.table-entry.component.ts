import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Training} from './training';


@Component({
  selector: 'app-training-table-entry',
  templateUrl: 'training.table-entry.component.html',
  styleUrls: ['training.table-entry.component.css'],
})
export class TrainingTableEntryComponent {
  @Input() training: Training;
  @Output() notify = new EventEmitter<Training>();
  userSelectedPrice = 0;

  // onTrainingSelect() {
  //   if (!this.isSelected) {
  //     this.isSelected = true;
  //     this.training.isSelected = true;
  //     this.notify.emit(this.training);
  //   } else {
  //     this.isSelected = false;
  //     this.training.isSelected = false;
  //     this.notify.emit(this.training);
  //   }
  // }
  onNotify(userSelectedPrice: number) {
    this.training.isSelected = true;
  }
}
