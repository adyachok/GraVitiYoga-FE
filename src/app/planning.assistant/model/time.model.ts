export class TimeModel {
  hour: number;
  minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }

  toString() {
    let minute = this.minute.toString();
    if (minute === '0' ) {
      minute = '00';
    }
    return '' + this.hour + ':' + minute;
  }

  gt(other: TimeModel) {
    const our = this.hour * 60 + this.minute;
    const notOur = other.hour * 60 + other.minute;
    return our > notOur;
  }

  lt (other: TimeModel) {
    return !this.gt(other);
  }

  eq(other: TimeModel) {
    const our = this.hour * 60 + this.minute;
    const notOur = other.hour * 60 + other.minute;
    return our === notOur;
  }
}
