import {Component, OnInit} from '@angular/core';
import {TrainingService} from './service/training.service';
import {Training} from './model/training.model';
import {TrainingEventService} from './service/training.event.setvice';
import {TrainingEventSelectionService} from '../planning.assistant/services/training.event.selection.service';


@Component({
  selector : 'app-fit-assistant',
  templateUrl: 'fit.assistant.component.html',
  styleUrls: ['fit.assistant.component.css'],
  providers: [TrainingEventService]
})
export class FitAssistantComponent implements OnInit {
  trainings: Training[];
  errorMessage: string;

  constructor(private trainingService: TrainingService,
              private trainingEventService: TrainingEventService,
              private trainingEventSelectionService: TrainingEventSelectionService) { }

  ngOnInit(): void {
    this.trainingService.getTrainingsMock()
      .subscribe(trainings => {
        this.trainings = trainings;
        },
          error => this.errorMessage = <any>error
      );

  }
}
