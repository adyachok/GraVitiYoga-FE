import {Injectable} from '@angular/core';
import {SelectedTraining} from '../../fit.assistant/model/selected.training.model';
import {TrainingEventSelectionService} from '../../planning.assistant/services/training.event.selection.service';


@Injectable()
export class TrainingSelectService {
  private selectedTrainings: SelectedTraining[];

  constructor (private trainingEventSelectionService: TrainingEventSelectionService) {
    this.selectedTrainings = [];
  }

  get(trainingName: string): SelectedTraining {
    return this.selectedTrainings.find(training => training.trainingName === trainingName);
  }

  set(training: SelectedTraining) {
    this.delete(training);
    this.selectedTrainings.push(training);
  }

  delete(training: SelectedTraining) {
    const idx = this.index(training.trainingName);
    if (idx >= 0) {
      this.selectedTrainings.splice(idx, 1);
      this.trainingEventSelectionService.clean(training.trainingName);
    }
  }

  index(trainingName: string): number {
    // Returns index of selected training or -1
    return this.selectedTrainings.findIndex(training => training.trainingName === trainingName);
  }

  empty(): boolean {
    return this.selectedTrainings.length === 0;
  }

  values(): SelectedTraining[] {
    return this.selectedTrainings;
  }

  names(): string[] {
    return this.selectedTrainings.map(training => training.trainingName);
  }
}
