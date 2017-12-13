import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TrainingEvent} from '../model/training.event.model';
import {TrainingEventSelection} from '../model/training.event.selection.model';
import {TrainingEventEditMessageModel} from '../model/training.event.edit.message.model';

@Injectable()
export class MarkEventService {
  private markEventSource = new Subject<TrainingEventEditMessageModel>();

  events$ = this.markEventSource.asObservable();

  announce(event: TrainingEventEditMessageModel) {
    this.markEventSource.next(event);
  }
}
