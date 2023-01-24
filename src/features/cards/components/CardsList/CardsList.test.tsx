import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CardsList } from '@features/cards/components/CardsList/CardsList';
import { reducer } from '@app/store';
import { getDocs } from '../../../../__mocks__/firebase/firestore';
import { cardsAPIStub } from '@features/cards/stubs';
import { apiGetCards } from '@app/api';

describe('CardsList', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Рендерит loading до загрузки данных', async () => {
    getDocs.mockResolvedValue(cardsAPIStub as any);
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <CardsList />
      </Provider>
    );

    expect(screen.queryByTestId('cards-loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('cards-loading')).not.toBeInTheDocument();
    });
  });

  test('Рендерит список карточек после загрузки данных', async () => {
    getDocs.mockResolvedValue(cardsAPIStub as any);
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <CardsList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('cards-list')).toBeInTheDocument();
    });
  });

  test('Возвращает ошибку если запрос вернулся с ошибкой', async () => {
    getDocs.mockResolvedValue({
      exists: () => false,
      data: () => null,
    } as any);

    const cards = apiGetCards();

    await waitFor(() => {
      expect(cards).rejects.toThrowError();
    });
  });
});
