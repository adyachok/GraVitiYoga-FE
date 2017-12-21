import {Component, OnInit} from '@angular/core';
import {TrainingEventSelectionService} from '../planning.assistant/services/training.event.selection.service';
import {Settings} from '../settings/settings';
import {CalculationService} from './service/calculation.service';


@Component({
  selector: 'app-week-plan',
  templateUrl: 'week.plan.component.html',
  styleUrls: ['week.plan.component.css']
})
export class WeekPlanComponent implements OnInit {
  private days = Settings.weekDays;
  private trainings = {};

  constructor(private calculationService: CalculationService) {}

  empty(): boolean {
    for (const day of this.days) {
      if (this.trainings[day] && this.trainings[day].length) {
        return false;
      }
    }
    return true;
  }

  ngOnInit() {
    for (const day of Settings.weekDays) {
      this.trainings[day] = this.calculationService.getByDay(day);
    }
  }
}
