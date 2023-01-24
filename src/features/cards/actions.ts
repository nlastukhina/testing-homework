import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCards, apiDeleteCard, apiSaveNewCard, apiUpdateCard, CardSaveData } from '@app/api';

import {
  addCard as addCardState,
  deleteCard as deleteCardState,
  updateCard as updateCardState,
  setCards as setCardsState,
} from './slice';

export const fetchCards = createAsyncThunk('api/fetchCards', (_, thunk) => {
  return apiGetCards().then((cardsList) => {
    thunk.dispatch(setCardsState(cardsList));
  });
});

export const addCard = createAsyncThunk('api/addCard', (data: CardSaveData, thunk) => {
  return apiSaveNewCard(data).then((newCard) => {
    if (newCard) {
      thunk.dispatch(addCardState(newCard));
    }
  });
});

export const updateCard = createAsyncThunk('api/deleteCard', (cardData: any, thunk) => {
  const { id, data } = cardData;

  return apiUpdateCard(id, data).then((newCard) => {
    if (newCard) {
      thunk.dispatch(updateCardState({ id: newCard.id, newCard }));
    }
  });
});

export const deleteCard = createAsyncThunk('api/deleteCard', (id: string, thunk) => {
  return apiDeleteCard(id).then(() => {
    thunk.dispatch(deleteCardState(id));
  });
});
