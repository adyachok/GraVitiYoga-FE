import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TrainingEventEditMessageModel} from '../model/training.event.edit.message.model';

@Injectable()
export class SetEventService {
  private setEventSource = new Subject<TrainingEventEditMessageModel>();

  events$ = this.setEventSource.asObservable();

  announce(event: TrainingEventEditMessageModel) {
    this.setEventSource.next(event);
  }
}
