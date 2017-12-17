import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../fit.assistant/service/training.service';
import {Training} from '../fit.assistant/model/training.model';
import {SelectedTraining} from '../fit.assistant/model/selected.training.model';
import {TrainingSelectService} from './service/training.select.service';


@Component({
  selector: 'app-selection-assistant',
  templateUrl: 'selection.assistant.component.html',
  styleUrls: ['selection.assistant.component.css'],
})
export class SelectionAssistantComponent implements OnInit {
  trainings: Training[];
  errorMessage: string;

  constructor(private trainingService: TrainingService,
              private trainingSelectService: TrainingSelectService) {}

  onNotify(training: SelectedTraining) {
    if (training.selected) {
      this.trainingSelectService.set(training);
    } else {
      this.trainingSelectService.delete(training);
    }
    // Update selection on fit assistant or wait to next step
  }


  ngOnInit(): void {
    this.trainingService.getTrainingsMock()
      .subscribe(trainings => this.trainings = trainings,
        error => this.errorMessage = <any>error);
  }
}
