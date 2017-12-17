import {Component, OnInit} from '@angular/core';
import {TrainingEventSelectionService} from '../planning.assistant/services/training.event.selection.service';
import {TrainingSelectService} from '../selection.assistant/service/training.select.service';
import {SelectedTraining} from '../fit.assistant/model/selected.training.model';
import {TrainingEventSelection} from '../planning.assistant/model/training.event.selection.model';
import {TrainingService} from '../fit.assistant/service/training.service';
import {Training} from '../fit.assistant/model/training.model';
import {TrainingSummary} from './model/TrainingSummary';


@Component({
  selector: 'app-calculation-assistant',
  templateUrl: 'calculation.assistant.component.html',
  styleUrls: ['calculation.assistant.component.css']
})
export class CalculationAssistantComponent implements OnInit {
  private trainings: Training[];
  private selectedTrainings: SelectedTraining[];
  private selectedEvents: TrainingEventSelection[];
  private errorMessage: string;
  private trainingSummary: TrainingSummary[];

  constructor(private trainingService: TrainingService,
              private trainingSelectService: TrainingSelectService,
              private trainingEventSelectionService: TrainingEventSelectionService) {
    this.selectedTrainings = [];
    this.selectedEvents = [];
    this.trainings = [];
    this.trainingSummary = [];
  }

  buildSummary() {
    for (const selectedTraining of this.selectedTrainings) {
      const training = <TrainingSummary>this.trainings.find(
        _training => _training.name === selectedTraining.trainingName);
      training.duration = selectedTraining.duration;
      this.trainingSummary.push(training);
    }
  }

  ngOnInit(): void {
    this.trainingService.getTrainingsMock().subscribe(trainings => {
        this.trainings = trainings;
      },
      error => this.errorMessage = <any>error);
    this.selectedTrainings = this.trainingSelectService.values();
    // this.selectedEvents = this.trainingEventSelectionService
    this.buildSummary();
  }
}
