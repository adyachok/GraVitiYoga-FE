import {TimeModel} from '../planning.assistant/model/time.model';

export class DiscountsSettings {
  // Contains a list of settings for a special discounts

  // Discount for early time trainings
  static earlyTimeDiscount = new TimeModel(10, 0);
  static earlyTimeDiscountRate = 10;
}
