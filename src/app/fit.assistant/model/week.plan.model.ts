import {DayEvent} from './day.event.model';

export class WeekPlan {
  private Monday: DayEvent[];
  private Tuesday: DayEvent[];
  private Wednesday: DayEvent[];
  private Thursday: DayEvent[];
  private Friday: DayEvent[];
  private Saturday: DayEvent[];
  private Sunday: DayEvent[];

  setDayEvent(dayEvent: DayEvent) {
    if (this.isTimeSlotAvailable(dayEvent)) {
      this[dayEvent.day].push(dayEvent);
    } else {
      // notify that time slot is impossible, because time slots conflict
    }
  }

  private isTimeSlotAvailable(dayEvent: DayEvent): boolean {
    // Checks if are already planned events during event start time and finish time
    const dayPlan = this[dayEvent.day];
    const slotArray = dayPlan.filter( day => day.startTime === dayEvent.startTime);
    if (slotArray.length > 0) {
      return false;
    }
    const durationArray = this.getTimeSlots(dayEvent.startTime);
    for (const startTime of durationArray) {
      const timeSlots = dayPlan.filter(day => day.startTime === startTime);
      if (timeSlots.length > 0) {
        return false;
      }
    }
    return true;
  }

  getTimeSlots(startTime: string, duration = 60, checkDistance = 15) {
    // Generates time slots to check on conflicts
    const eventStartTimeArray = startTime.split(':');
    let startHour = Number(eventStartTimeArray[0]);
    let startMinutes = Number(eventStartTimeArray[1]);
    const durationArray = [];
    const timeSlotsToCheck = duration / checkDistance; // every 15 minutes
    for (let i = 0; i <= timeSlotsToCheck; i += checkDistance) {
      startMinutes += i;
      if (startMinutes >= 60) {
        startHour += 1;
        startMinutes = startMinutes - 60;
      }
      const checkTime = '' + startHour + ':' + startMinutes;
      durationArray.push(checkTime);
    }
    return durationArray;
  }
}
