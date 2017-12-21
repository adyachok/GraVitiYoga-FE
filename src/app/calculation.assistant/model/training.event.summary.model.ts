import {TrainingEvent} from '../../planning.assistant/model/training.event.model';
import {TimeSlotModel} from '../../planning.assistant/model/time.slot.model';
import {Settings} from '../../settings/settings';
import {DiscountCounter} from '../discounts/discount.counter';

export class TrainingEventSummary extends TrainingEvent {
  // Price is received from TrainingSelected object with discount on duration counted in it
  price: number;
  discounts: DiscountCounter[];

  constructor(trainingName: string, timeSlot: TimeSlotModel, price: number) {
    super(trainingName, timeSlot);
    this.price = price;
    this.discounts = [];
    this.initDiscounts();
  }

  getPrice(): number {
    let discountedPrice = this.price;
    for (const discount of this.discounts) {
      discountedPrice -= discount.count();
    }
    return discountedPrice;
  }

  initDiscounts() {
    for (const discount of Settings.discounts) {
      this.discounts.push(new discount(this));
    }
  }

  compare(other: TrainingEventSummary) {
    if (this.eq(other)) {
      return 0;
    } else if (this.gt(other)) {
      return 1;
    } else {
      return -1;
    }
  }

  isPriceDiscounted () {
    return this.discounts.filter(discount => discount.isActive()).length > 0;
  }
}
