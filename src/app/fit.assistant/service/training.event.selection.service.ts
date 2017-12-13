import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TrainingEventSelection} from '../../planning.assistant/model/training.event.selection.model';


@Injectable()
export class TrainingEventSelectionService {
  private requestSource = new Subject<Object>();
  private responseSource = new Subject<TrainingEventSelection>();
  private setEventSource = new Subject<TrainingEventSelection>();

  events$ = this.setEventSource.asObservable();
  requests$ = this.requestSource.asObservable();
  responses$ = this.responseSource.asObservable();

  // Logic to get all TrainingEventSelection
  request(event: TrainingEventSelection) {
    this.requestSource.next(event);
  }
  response(event: TrainingEventSelection) {
    this.responseSource.next(event);
  }

  // Logic to announce new TrainingEventSelection
  announce(event: TrainingEventSelection) {
    this.setEventSource.next(event);
  }
}
