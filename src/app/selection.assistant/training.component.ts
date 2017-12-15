import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Training} from '../fit.assistant/model/training.model';
import {SelectedTraining} from '../fit.assistant/model/selected.training.model';
import {TrainingSelectDoService} from './service/training.select.do.service';
import {TrainingSelectUndoService} from './service/training.select.undo.service';


@Component({
  selector: 'app-training-entry',
  templateUrl: 'training.component.html',
  styleUrls: ['training.component.css'],
  providers: [TrainingSelectDoService, TrainingSelectUndoService]
})
export class TrainingComponent {
  @Input() training: Training;
  @Output() notify = new EventEmitter<SelectedTraining>();
  canDelete = false;

  constructor(private trainingSelectDoService: TrainingSelectDoService,
              private trainingSelectUndoService: TrainingSelectUndoService) {
    trainingSelectDoService.events$.subscribe(
      selectedDuration => {
        this.notify.emit({'trainingName': this.training.name,
          'duration': selectedDuration, 'selected': true });
        this.canDelete = true;
      });
    trainingSelectUndoService.events$.subscribe( unselected => {
      this.notify.emit(
        {
          'trainingName': this.training.name,
          'duration': 0,
          'selected': false
        });
      this.canDelete = false;
    });
  }
}
