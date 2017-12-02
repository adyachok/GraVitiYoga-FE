import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TrainingEvent} from '../model/training.event.model';

@Injectable()
export class MarkEventService {
  private markEventSource = new Subject<TrainingEvent>();

  markEvent$ = this.markEventSource.asObservable();

  announceEventMarking(event: TrainingEvent) {
    this.markEventSource.next(event);
  }
}
