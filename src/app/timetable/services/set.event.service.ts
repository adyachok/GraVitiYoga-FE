import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TrainingEvent} from '../model/training.event.model';

@Injectable()
export class SetEventService {
  private setEventSource = new Subject<TrainingEvent>();

  setEvent$ = this.setEventSource.asObservable();

  announceEventSetting(event: TrainingEvent) {
    this.setEventSource.next(event);
  }
}
