import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TrainingSelectUndoService {
  private unselectedTrainingSource = new Subject<boolean>();

  events$ = this.unselectedTrainingSource.asObservable();

  announce(unselected: boolean) {
    this.unselectedTrainingSource.next(unselected);
  }
}
