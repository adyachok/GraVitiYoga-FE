import {Injectable} from '@angular/core';
import {Training} from '../../fit.assistant/model/training.model';
import {TrainingEventSummary} from '../model/training.event.summary.model';
import {TrainingSummary} from '../model/training.summary.model';
import {TrainingService} from '../../fit.assistant/service/training.service';
import {TrainingSelectService} from '../../selection.assistant/service/training.select.service';
import {TrainingEventSelectionService} from '../../planning.assistant/services/training.event.selection.service';
import {TrainingSummaryBuilder} from '../model/training.summary.builder';

@Injectable()
export class CalculationService {
  private trainings: Training[];
  private trainingEventsSummaries: TrainingEventSummary[];
  private errorMessage: string;
  private trainingSummary: TrainingSummary[];

  constructor(private trainingService: TrainingService,
              private trainingSelectService: TrainingSelectService,
              private trainingEventSelectionService: TrainingEventSelectionService) {
    this.trainingEventsSummaries = [];
    this.trainings = [];
    this.trainingSummary = [];
    this.trainingService.getTrainingsMock().subscribe(trainings => {
        this.trainings = trainings;
      },
      error => this.errorMessage = <any>error);
    this.buildTrainingSummary();
    this.buildTrainingEventSummary();
  }

  private buildTrainingSummary(): void {
    for (const selectedTraining of this.trainingSelectService.values()) {
      const trainingSummary = TrainingSummaryBuilder.fromSelectedTraining(selectedTraining);
      const training = this.trainings.find(
        _training => _training.name === selectedTraining.trainingName);
      trainingSummary.selectedDurationDiscountRate = training.discountPolicy.discounts.find(
        disc => disc.month === selectedTraining.duration).rate;
      trainingSummary.price = training.price;
      this.trainingSummary.push(trainingSummary);
    }
  }

  private buildTrainingEventSummary(): void {
    for (const selectedTrainingEvent of this.trainingEventSelectionService.values()) {
      const event = selectedTrainingEvent.trainingEvent;
      const discountedPrice = this.getTrainingByName(event.trainingName).getDiscountPriceCount();
      const trainingEventSummary = new TrainingEventSummary(event.trainingName, event.timeSlot, discountedPrice);
      this.trainingEventsSummaries.push(trainingEventSummary);
    }
  }

  private getTrainingByName(name: string): TrainingSummary {
    return this.trainingSummary.find(training => training.trainingName === name);
  }

  getByDay(day: string): TrainingEventSummary[] {
    return this.trainingEventsSummaries.filter( event => event.timeSlot.day === day)
      .sort((o1, o2) => o1.compare(o2));
  }

  getTrainingSummary() {
    return this.trainingSummary;
  }

  getTrainingEventSummary() {
    return this.trainingEventsSummaries;
  }
}
