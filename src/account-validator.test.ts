import { validate } from './account-validator';

describe('validate', () => {
  it('should validate valid account number', () => {
    expect(validate('345882865')).toEqual(true);
  });

  it('should not validate valid account number', () => {
    expect(validate('345882866')).toEqual(false);
  });
});
