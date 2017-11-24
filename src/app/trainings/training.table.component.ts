import {Training} from './training';
import {Component, OnInit} from '@angular/core';
import {TrainingService} from './training.service';


@Component({
  selector: 'app-training-table',
  templateUrl: 'training.table.component.html',
  styleUrls: ['training.table.component.css']
})
export class TrainingTableComponent implements OnInit {
  trainings: Training[];
  total: number;
  errorMessage: string;

  constructor(private _trainingService: TrainingService) {
    this.total = 0;
  }
  onNotify(training: Training) {
    if (training.isSelected) {
      this.total += training.price;
    } else {
      this.total -= training.price;
    }
  }
  ngOnInit(): void {
    this._trainingService.getTrainingsMock()
      .subscribe(trainings => this.trainings = trainings,
        error => this.errorMessage = <any>error);
  }
}
