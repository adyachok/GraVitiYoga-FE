import {Component, OnInit} from '@angular/core';
import {TrainingEventSelectionService} from '../planning.assistant/services/training.event.selection.service';
import {Settings} from '../settings/settings';


@Component({
  selector: 'app-week-plan',
  templateUrl: 'week.plan.component.html',
  styleUrls: ['week.plan.component.css']
})
export class WeekPlanComponent implements OnInit {
  private days = Settings.weekDays;
  private trainings = {};

  constructor(private trainingEventSelectionService: TrainingEventSelectionService) {}

  ngOnInit() {
    for (const day of Settings.weekDays) {
      this.trainings[day] = this.trainingEventSelectionService.getByDay(day);
    }
  }
}
