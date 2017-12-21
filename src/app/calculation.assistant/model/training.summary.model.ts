import {SelectedTraining} from '../../fit.assistant/model/selected.training.model';


export class TrainingSummary extends SelectedTraining {
  // Duration in month
  selectedDurationDiscountRate: number;
  price: number;

  getDiscountCount(): number {
    return Math.round(this.price * this.selectedDurationDiscountRate / 100);
  }

  getDiscountPriceCount() {
    return this.price - this.getDiscountCount();
  }
}
