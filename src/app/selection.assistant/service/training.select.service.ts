import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TrainingSelectService {
  private selectedTrainingSource = new Subject<number>();

  selectedTraining$ = this.selectedTrainingSource.asObservable();

  announceTrainingSelection(selectedDuration: number) {
    this.selectedTrainingSource.next(selectedDuration);
  }
}
