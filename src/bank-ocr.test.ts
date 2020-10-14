import { printAccounts } from './bank-ocr';

describe('Bank OCR', () => {
  describe('printAccounts', () => {
    it('validates a one-line file', async () => {
      expect(await printAccounts(`${__dirname}/0123456789.txt`)).toEqual(
        '0123456789',
      );
    });

    it('validates a 3-line file', async () => {
      expect(
        await printAccounts(`${__dirname}/acceptance-corrupted.txt`),
      ).toEqual('000000051\n000000050 ERR\n0000??050 ILL');
    });
  });
});
