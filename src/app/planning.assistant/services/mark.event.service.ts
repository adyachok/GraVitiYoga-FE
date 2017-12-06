import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TrainingEvent} from '../model/training.event.model';
import {TrainingEventSelection} from '../model/training.event.selection.model';

@Injectable()
export class MarkEventService {
  private markEventSource = new Subject<TrainingEventSelection>();

  markEvent$ = this.markEventSource.asObservable();

  announceEventMarking(event: TrainingEventSelection) {
    this.markEventSource.next(event);
  }
}
