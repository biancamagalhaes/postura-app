import { combineReducers, Reducer } from 'redux';
import { RootState } from './state';
import axios from 'axios';
import userReducer from './user';

export interface Action {
  type: string;
  payload: any;
}

export const reducer: Reducer<RootState> = combineReducers<RootState, any>({
  user: userReducer,
});

export const rootReducer = (state: RootState, action: any) => {
  return reducer(state, action);
};

axios.defaults.headers = {
  'Content-Type': 'application/json',
};

export type Error = any;
