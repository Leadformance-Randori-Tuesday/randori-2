import { parseAccountFile } from './bank-parser';
import { validate } from './account-validator';

export async function printAccounts(fileName: string) {
  const result = await validateAccountFile(fileName);

  return result
    .map(value => `${value.number} ${value.result}`.trim())
    .join('\n');
}

async function validateAccountFile(fileName: string) {
  const parsedAccounts = await parseAccountFile(fileName);

  return parsedAccounts.map(parsedAccount => {
    if (parsedAccount.includes('?')) {
      return { number: parsedAccount, result: 'ILL' };
    }

    return {
      number: parsedAccount,
      result: validate(parsedAccount) ? '' : 'ERR',
    };
  });
}
