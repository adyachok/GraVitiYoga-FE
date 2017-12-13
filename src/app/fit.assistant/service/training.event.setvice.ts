import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {TrainingEvent} from '../../planning.assistant/model/training.event.model';


@Injectable()
export class TrainingEventService {
  private requestSource = new Subject<Object>();
  private responseSource = new Subject<TrainingEvent>();
  private setEventSource = new Subject<TrainingEvent>();

  events$ = this.setEventSource.asObservable();
  requests$ = this.requestSource.asObservable();
  responses$ = this.responseSource.asObservable();

  // Logic to get all TrainingEvent
  request(event: Object) {
    this.requestSource.next(event);
  }
  response(event: TrainingEvent) {
    this.responseSource.next(event);
  }

  // Logic to announce new TrainingEvent
  announce(event: TrainingEvent) {
    this.setEventSource.next(event);
  }
}
