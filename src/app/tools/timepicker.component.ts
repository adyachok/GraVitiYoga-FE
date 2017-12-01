import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html'
})
export class TimepickerComponent implements OnInit {
  @Input() eventStartTime: string;
  time: NgbTimeStruct;
  hourStep = 1;
  minuteStep = 30;
  @Output() notifyTimeSelected = new EventEmitter<NgbTimeStruct>();

  convertStringTimeToNumbers(time: string) {
    const timeArrayStrings = time.split(':');
    const timeArrayNumbers = [];
    for ( const i of timeArrayStrings) {
      timeArrayNumbers.push(Number(i));
    }
    return timeArrayNumbers;
  }

  processTimeSelected(event: any) {
    console.log(this.time);
  }

  ngOnInit(): void {
    const eventTime = this.convertStringTimeToNumbers(this.eventStartTime);
    this.time = {hour: eventTime[0], minute: eventTime[1], second: 0};
  }
}
