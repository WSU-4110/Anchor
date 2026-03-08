import { Observer } from "./Observer";

export class ConsumerObserver implements Observer {
  constructor(private consumerId: string) {}

  update(businessId: string, message: string): void {
    console.log(
      `Consumer ${this.consumerId} notified about business ${businessId}: ${message}`
    );
  }
}
