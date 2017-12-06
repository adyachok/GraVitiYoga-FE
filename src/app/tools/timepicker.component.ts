import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {TimeModel} from '../planning.assistant/model/time.model';


@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html'
})
export class TimepickerComponent implements OnInit {
  @Input() eventStartTime: TimeModel;
  time: NgbTimeStruct;
  hourStep = 1;
  minuteStep = 30;
  @Output() notifyTimeSelected = new EventEmitter<NgbTimeStruct>();


  processTimeSelected(event: any) {
    console.log(this.time);
  }

  ngOnInit(): void {
    this.time = {hour: this.eventStartTime.hour, minute: this.eventStartTime.minute, second: 0};
  }
}
