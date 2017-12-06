import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TrainingEventSelection} from '../model/training.event.selection.model';

@Injectable()
export class SetEventService {
  private setEventSource = new Subject<TrainingEventSelection>();

  setEvent$ = this.setEventSource.asObservable();

  announceEventSetting(event: TrainingEventSelection) {
    this.setEventSource.next(event);
  }
}
