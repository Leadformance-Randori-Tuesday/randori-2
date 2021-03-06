import {
  parseAccountFile,
  parseAccountNumbers,
  parseLCDLine,
  parseNumber,
} from './bank-parser';

describe('Bank Parser OCR', () => {
  describe('parseAccountFile', () => {
    it('reads a one-line file', async () => {
      expect(await parseAccountFile(`${__dirname}/0123456789.txt`)).toEqual([
        '0123456789',
      ]);
    });

    it('reads a corrupted file', async () => {
      expect(
        await parseAccountFile(`${__dirname}/acceptance-corrupted.txt`),
      ).toEqual(['000000051', '000000050', '0000??050']);
    });
  });

  describe('parseAccountNumbers', () => {
    it('should read one number', () => {
      expect(
        parseAccountNumbers(
          ` _  
| | 
|_| `.split('\n'),
        ),
      ).toEqual('0');

      expect(
        parseAccountNumbers(
          `    
  | 
  | `.split('\n'),
        ),
      ).toEqual('1');
    });

    it('should read two numbers', () => {
      expect(
        parseAccountNumbers(
          ` _      
| |   | 
|_|   | `.split('\n'),
        ),
      ).toEqual('01');
    });
  });

  describe('parseLCDLine', () => {
    it('should parse one number', () => {
      expect(
        parseLCDLine(
          ` _  
| | 
|_| `.split('\n'),
        ),
      ).toEqual([' _ | ||_|']);
    });

    it('should parse two numbers for one line', () => {
      expect(
        parseLCDLine(
          ` _      
| |   | 
|_|   | `.split('\n'),
        ),
      ).toEqual([' _ | ||_|', '     |  |']);
    });
  });

  describe('parseNumber', () => {
    it.each([
      ['0', ' _ | ||_|'],
      ['1', '     |  |'],
      ['2', ' _  _||_ '],
      ['3', ' _  _| _|'],
      ['4', '   |_|  |'],
      ['5', ' _ |_  _|'],
      ['6', ' _ |_ |_|'],
      ['7', ' _   |  |'],
      ['8', ' _ |_||_|'],
      ['9', ' _ |_| _|'],
      ['?', ' _ |_|   '],
    ])('Checking %s', (resultNumber, lcdNumber) => {
      expect(parseNumber(lcdNumber)).toBe(resultNumber);
    });
  });
});
