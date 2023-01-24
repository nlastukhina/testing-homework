import { OperationAPI } from '@features/operations/types';

export const operationAPIStub: Omit<OperationAPI, 'id'> = {
  name: 'Оплата',
  value: 1234,
  type: 'expense',
  cardNumber: '1234 **** **** 3456',
  created: {
    seconds: 123123,
    nanoseconds: 123123,
  },
};

export const operationsAPIStub = [
  {
    data: (): Omit<OperationAPI, 'id'> => operationAPIStub,
    id: '9zr0yMNTURoRICWFE530',
  },
  {
    data: (): Omit<OperationAPI, 'id'> => operationAPIStub,
    id: 'lU73A7nsJnQmdGpzkPUp',
  },
];
