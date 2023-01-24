import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiDeleteOperation,
  apiGetOperations,
  apiSaveNewOperation,
  apiUpdateOperation,
  OperationSaveData,
} from '@app/api';

import {
  addOperation as addOperationState,
  deleteOperation as deleteOperationState,
  updateOperation as updateOperationState,
  setOperations as setOperationsState,
} from './slice';

export const fetchOperaions = createAsyncThunk('api/fetchOperaions', (_, thunk) => {
  return apiGetOperations().then((operations) => {
    thunk.dispatch(setOperationsState(operations));
  });
});

export const addOperation = createAsyncThunk('api/addOperation', (data: OperationSaveData, thunk) => {
  return apiSaveNewOperation(data).then((operaion) => {
    if (operaion) {
      thunk.dispatch(addOperationState(operaion));
    }
  });
});

export const updateOperation = createAsyncThunk('api/deleteCard', (operationData: any, thunk) => {
  const { id, data } = operationData;
  return apiUpdateOperation(id, data).then((newOperation) => {
    if (newOperation) {
      thunk.dispatch(updateOperationState({ id: newOperation.id, newOperation }));
    }
  });
});

export const deleteOperation = createAsyncThunk('api/deleteOperation', (id: string, thunk) => {
  return apiDeleteOperation(id).then(() => {
    thunk.dispatch(deleteOperationState(id));
  });
});
