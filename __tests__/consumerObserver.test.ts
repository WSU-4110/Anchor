
import { ConsumerObserver } from '../services/consumerObserver';

describe('ConsumerObserver.update', () => {
  test('logs message', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(()=>{});
    const obs = new ConsumerObserver('c1');
    obs.update('b1','sale');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
