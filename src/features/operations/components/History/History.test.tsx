import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '@app/store';
import { getDocs } from '../../../../__mocks__/firebase/firestore';
import { operationsAPIStub } from '@features/operations/stubs';
import { History } from '@features/operations/components/History/History';
import { apiGetOperations } from '@app/api';

describe('History', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Рендерит loading до загрузки данных, затем данные', async () => {
    getDocs.mockResolvedValue(operationsAPIStub as any);
    const store = configureStore({ reducer });

    const { container } = render(
      <Provider store={store}>
        <History />
      </Provider>
    );

    const loading = container.getElementsByClassName('ant-list-loading');

    expect(loading.length).toBe(1);

    await waitFor(() => {
      const { container } = render(
        <Provider store={store}>
          <History />
        </Provider>
      );

      const loading = container.getElementsByClassName('ant-list-loading');

      expect(loading.length).toBe(0);
    });
  });

  test('Возвращает ошибку если запрос вернулся с ошибкой', async () => {
    getDocs.mockResolvedValue({
      exists: () => false,
      data: () => null,
    } as any);

    const operations = apiGetOperations();

    await waitFor(() => {
      expect(operations).rejects.toThrowError();
    });
  });
});
