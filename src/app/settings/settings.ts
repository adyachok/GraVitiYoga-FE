import {TimeModel} from '../planning.assistant/model/time.model';
import {EarlyTimeDiscountCounter} from '../calculation.assistant/discounts/early.time.discount.conter';

export class Settings {
  static weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  static workDayStart = new TimeModel(8, 0);
  static workDayFinish = new TimeModel(21, 0);
  static timeSlotInterval = 0.5;
  static trainingDuration = 60;
  // List of discounts to be applied for a training price
  static discounts = [EarlyTimeDiscountCounter];
}
