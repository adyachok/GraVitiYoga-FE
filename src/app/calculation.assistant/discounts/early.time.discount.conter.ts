import {TimeModel} from '../../planning.assistant/model/time.model';
import {DiscountCounter} from './discount.counter';
import {TrainingEventSummary} from '../model/training.event.summary.model';
import {DiscountsSettings} from '../../settings/discounts.settings';
import {TrainingSummary} from '../model/training.summary.model';



export class EarlyTimeDiscountCounter extends DiscountCounter {
  private rate: number;
  private toTime: TimeModel;
  private name = 'Утренняя';
  private trainingEventSummary: TrainingEventSummary;

  constructor(trainingEventSummary: TrainingEventSummary) {
    super();
    this.rate = DiscountsSettings.earlyTimeDiscountRate;
    this.toTime = DiscountsSettings.earlyTimeDiscount;
    this.trainingEventSummary = trainingEventSummary;
  }

  count(): number {
    const timeSlot = this.trainingEventSummary.timeSlot;
    if (timeSlot.finish.eq(this.toTime) || timeSlot.finish.lt(this.toTime)) {
      return this.trainingEventSummary.price * this.rate / 100;
    }
    return 0;
  }

  toString() {
    return this.name;
  }

  isActive() {
    return this.count() !== 0;
  }
}
