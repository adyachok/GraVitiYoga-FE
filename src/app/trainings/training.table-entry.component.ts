import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Training} from './training';


@Component({
  selector: 'app-training-table-entry',
  templateUrl: 'training.table-entry.html',
  styleUrls: ['training.table-entry.css'],
})
export class TrainingTableEntryComponent {
  @Input() name: string;
  @Input() price: number;
  @Input() image: string;
  isSelected = false;
  @Output() notify = new EventEmitter<Training>();

  onTrainingSelect() {
    const training = {name: this.name, price: this.price, isSelected: false, image: '' };
    if (!this.isSelected) {
      this.isSelected = true;
      training.isSelected = true;
      this.notify.emit(training);
    } else {
      this.isSelected = false;
      this.notify.emit(training);
    }
  }
}
