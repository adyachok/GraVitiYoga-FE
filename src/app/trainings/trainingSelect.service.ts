import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TrainingSelectService {
  private selectedTrainingSource = new Subject<number>();

  selectedTraining$ = this.selectedTrainingSource.asObservable();

  announceTrainingSelection(selectedPrice: number) {
    this.selectedTrainingSource.next(selectedPrice);
  }
}
