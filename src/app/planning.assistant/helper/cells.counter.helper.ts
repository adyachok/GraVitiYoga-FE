export class CellsCounterHelper {

  public buidTimeSlots(start, stop, step: number): string[][] {
    const timeSlotsArr = this.generator(start, stop, step);
    return this.convertToTimeSlot(timeSlotsArr);
  }

  private generator(start, stop, step: number): number[][] {
    let previous_timeslot = start;
    const time_slots = [];
    for (let i = start; i <= stop; i += step) {
      if (previous_timeslot !== i) {
        time_slots.push([previous_timeslot, i]);
        previous_timeslot = i;
      } else {
        previous_timeslot = i;
      }
    }
    return time_slots;
  }

  private convertToTimeSlot(timeSlotsArray: number[][]): string[][] {
    // Supports timeslots of 15 and 30 minutes
    const timeSlots = [];
    for ( const i of timeSlotsArray) {
      const timeSlot = [];
      for ( const j of i) {
        const whole =  Math.floor(j);
        const rest =  j % whole;
        let minutes = '00';

        switch (rest) {
          case 0.25 : minutes = '15';
            break;
          case 0.50 : minutes = '30';
            break;
          case 0.75: minutes = '45';
        }
        const _time = whole + ':' + minutes;
        timeSlot.push(_time);
      }
      timeSlots.push(timeSlot);
    }
    return timeSlots;
  }
}
