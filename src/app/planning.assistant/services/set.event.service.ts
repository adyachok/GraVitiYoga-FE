import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TrainingEventSelection} from '../model/training.event.selection.model';
import {TrainingEventEditMessageModel} from '../model/training.event.edit.message.model';

@Injectable()
export class SetEventService {
  private setEventSource = new Subject<TrainingEventEditMessageModel>(); // TrainingEventSelection>();

  setEvent$ = this.setEventSource.asObservable();

  announceEventSetting(event: TrainingEventEditMessageModel) {
    this.setEventSource.next(event);
  }
}
