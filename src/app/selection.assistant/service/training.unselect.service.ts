import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TrainingUnselectService {
  private unselectedTrainingSource = new Subject<boolean>();

  unselectedTraining$ = this.unselectedTrainingSource.asObservable();

  announceTrainingunSelection(unselected: boolean) {
    this.unselectedTrainingSource.next(unselected);
  }
}
