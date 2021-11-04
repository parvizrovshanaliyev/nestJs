import { CustomerEntity } from './customers/customer.entity';

describe('CustomerEntity', () => {
  it('should be defined', () => {
    expect(new CustomerEntity()).toBeDefined();
  });
});
