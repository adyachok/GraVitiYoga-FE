import {Training} from './training';
import {Component, OnInit} from '@angular/core';
import {TrainingService} from './training.service';
import {SelectedTraining} from './selectedTraining';


@Component({
  selector: 'app-training-table',
  templateUrl: 'training.table.component.html',
  styleUrls: ['training.table.component.css']
})
export class TrainingTableComponent implements OnInit {
  trainings: Training[];
  selectedTrainings: SelectedTraining[];
  total: number;
  errorMessage: string;

  constructor(private _trainingService: TrainingService) {
    this.total = 0;
  }
  onNotify(training: SelectedTraining) {
    if (training.selected) {
      this.addSelectedTraining(training);
    } else {
      this.removeSelectedTraining(training);
    }
    this.countTotal();
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

  countTotal() {
    let counted_total = 0;
    this.selectedTrainings.forEach(training => {
      counted_total += training.selectedPrice;
    });
    this.total = counted_total;
  }

  ngOnInit(): void {
    this.selectedTrainings = [];
    this._trainingService.getTrainingsMock()
      .subscribe(trainings => this.trainings = trainings,
        error => this.errorMessage = <any>error);
  }
}
