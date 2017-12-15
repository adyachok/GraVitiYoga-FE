import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TrainingSelectDoService {
  private selectedTrainingSource = new Subject<number>();

  events$ = this.selectedTrainingSource.asObservable();

  announce(selectedDuration: number) {
    this.selectedTrainingSource.next(selectedDuration);
  }
}
