import { CardsAPI } from '@features/cards/types';

export const cardAPIStub: Omit<CardsAPI, 'id'> = {
  balance: 10000,
  color: 'blue',
  number: '1234 **** **** 3456',
  created: {
    seconds: 123123,
    nanoseconds: 123123,
  },
};

export const cardsAPIStub = [
  {
    data: (): Omit<CardsAPI, 'id'> => cardAPIStub,
    id: '9zr0yMNTURoRICWFE530',
  },
  {
    data: (): Omit<CardsAPI, 'id'> => cardAPIStub,
    id: 'lU73A7nsJnQmdGpzkPUp',
  },
];
