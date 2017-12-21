export abstract class DiscountCounter {
  abstract count(): number;
  abstract toString(): string;
  abstract isActive(): boolean;
}
