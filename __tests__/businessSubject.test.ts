
import { BusinessSubject } from '../services/businessSubject';

class MockObserver {
  calls = [];
  update(businessId, message) {
    this.calls.push({ businessId, message });
  }
}

describe('BusinessSubject.attach', () => {
  test('attach adds observer', () => {
    const subject = new BusinessSubject('b1');
    const obs = new MockObserver();
    subject.attach(obs);
    subject.notify('hi');
    expect(obs.calls.length).toBe(1);
  });
});

describe('BusinessSubject.detach', () => {
  test('detach removes observer', () => {
    const subject = new BusinessSubject('b1');
    const o1 = new MockObserver();
    const o2 = new MockObserver();
    subject.attach(o1);
    subject.attach(o2);
    subject.detach(o1);
    subject.notify('msg');
    expect(o1.calls.length).toBe(0);
    expect(o2.calls.length).toBe(1);
  });
});

describe('BusinessSubject.notify', () => {
  test('notify calls all observers', () => {
    const subject = new BusinessSubject('b1');
    const o1 = new MockObserver();
    const o2 = new MockObserver();
    subject.attach(o1);
    subject.attach(o2);
    subject.notify('x');
    expect(o1.calls.length).toBe(1);
    expect(o2.calls.length).toBe(1);
  });
});
