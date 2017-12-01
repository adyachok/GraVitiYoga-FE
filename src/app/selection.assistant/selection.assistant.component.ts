import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../fit.assistant/service/training.service';
import {Training} from '../fit.assistant/model/training.model';
import {SelectedTraining} from '../fit.assistant/model/selected.training.model';


@Component({
  selector: 'app-selection-assistant',
  templateUrl: 'selection.assistant.component.html',
  styleUrls: ['selection.assistant.component.css']
})
export class SelectionAssistantComponent implements OnInit {
  trainings: Training[];
  errorMessage: string;
  selectedTrainings: SelectedTraining[];

  constructor(private trainingService: TrainingService) {}

  onNotify(training: SelectedTraining) {
    if (training.selected) {
      this.addSelectedTraining(training);
    } else {
      this.removeSelectedTraining(training);
    }
    // Update selection on fit assistant or wait to next step
  }

  findSelectedTraining(training: SelectedTraining): number {
    // Returns index of selected training or -1
    return this.selectedTrainings.findIndex(selected => selected.trainingName === training.trainingName);
  }

  removeSelectedTraining(training: SelectedTraining): void {
    const idx = this.findSelectedTraining(training);
    if (idx >= 0) {
      this.selectedTrainings.splice(idx, 1);
    }
  }

  addSelectedTraining(training: SelectedTraining): void {
    this.removeSelectedTraining(training);
    this.selectedTrainings.push(training);
  }

  ngOnInit(): void {
    this.selectedTrainings = [];
    this.trainingService.getTrainingsMock()
      .subscribe(trainings => this.trainings = trainings,
        error => this.errorMessage = <any>error);
  }
}
