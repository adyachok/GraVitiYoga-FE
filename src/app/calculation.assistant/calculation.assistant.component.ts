import {Component, OnInit} from '@angular/core';
import {TrainingSummary} from './model/training.summary.model';
import {CalculationService} from './service/calculation.service';


@Component({
  selector: 'app-calculation-assistant',
  templateUrl: 'calculation.assistant.component.html',
  styleUrls: ['calculation.assistant.component.css'],
  providers: [CalculationService]
})
export class CalculationAssistantComponent implements OnInit {
  private trainingSummary: TrainingSummary[];

  constructor(private calculationService: CalculationService) {
  }

  ngOnInit(): void {
    this.trainingSummary = this.calculationService.getTrainingSummary();
  }
}
