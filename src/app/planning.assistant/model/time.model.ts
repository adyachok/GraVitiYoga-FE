export class TimeModel {
  hour: number;
  minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }

  toMinutes(): number {
    return this.hour * 60 + this.minute;
  }

  toString(): string {
    let minute = this.minute.toString();
    if (minute === '0' ) {
      minute = '00';
    }
    return '' + this.hour + ':' + minute;
  }

  gt(other: TimeModel): boolean {
    return this.toMinutes() > other.toMinutes();
  }

  lt (other: TimeModel): boolean {
    return !this.gt(other);
  }

  eq(other: TimeModel): boolean {
    return this.toMinutes() === other.toMinutes();
  }

  toId(): string {
    let minute = this.minute.toString();
    if (minute === '0' ) {
      minute = '00';
    }
    return '' + this.hour + '-' + minute;
  }
}
