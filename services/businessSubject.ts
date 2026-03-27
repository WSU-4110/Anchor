import { Observer } from "./Observer";
import { Subject } from "./Subject";

export class BusinessSubject implements Subject {
  private observers: Observer[] = [];

  constructor(public businessId: string) {}

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(message: string): void {
    for (const observer of this.observers) {
      observer.update(this.businessId, message);
    }
  }
}
