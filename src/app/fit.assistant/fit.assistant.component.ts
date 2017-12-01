import {Component, OnInit} from '@angular/core';
import {WeekPlan} from './model/week.plan.model';
import {TrainingService} from './service/training.service';
import {Training} from './model/training.model';
import {SelectedTraining} from './model/selected.training.model';

@Component({
  selector : 'app-fit-assistant',
  templateUrl: 'fit.assistant.component.html',
  styleUrls: ['fit.assistant.component.css']
})
export class FitAssistantComponent implements OnInit {
  selectedTrainings: SelectedTraining[];
  weekPlan: WeekPlan;
  trainings: Training[];
  errorMessage: string;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.selectedTrainings = [];
    this.trainingService.getTrainingsMock()
      .subscribe(trainings => this.trainings = trainings,
        error => this.errorMessage = <any>error);
  }
}
