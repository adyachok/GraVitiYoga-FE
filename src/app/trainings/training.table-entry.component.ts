import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Training} from './training';
import {TrainingSelectService} from './trainingSelect.service';
import {SelectedTraining} from './selectedTraining';
import {TrainingUnselectService} from './trainingUnselectService';


@Component({
  selector: 'app-training-table-entry',
  templateUrl: 'training.table-entry.component.html',
  styleUrls: ['training.table-entry.component.css'],
  providers: [TrainingSelectService, TrainingUnselectService]
})
export class TrainingTableEntryComponent {
  @Input() training: Training;
  @Output() notify = new EventEmitter<SelectedTraining>();
  canDelete = false;

  constructor(private trainingSelectService: TrainingSelectService,
              private trainingUnselectService: TrainingUnselectService) {
    trainingSelectService.selectedTraining$.subscribe(
      selectedPrice => {
        this.notify.emit({'trainingName': this.training.name,
          'selectedPrice': selectedPrice, 'selected': true });
        this.canDelete = true;
      });
    trainingUnselectService.unselectedTraining$.subscribe( unselected => {
      this.notify.emit(
        {
          'trainingName': this.training.name,
          'selectedPrice': 0,
          'selected': false
        });
      this.canDelete = false;
    });
  }
}
