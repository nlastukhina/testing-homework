export const convertingAmount = (amount: string): number => {
  const result = parseInt(amount.replace(/\s+/g, '').replace(/-/, ''));

  if (result !== result) {
    return 0;
  }

  return result;
};
