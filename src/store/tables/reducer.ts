import {
  GET_TABLE_SUCCESS,
  GET_ALL_TABLES,
  GET_ALL_TABLES_SUCCESS,
  GET_ALL_TABLES_FAILURE,
  CLEAR_ALL_FAV,
  TOGGLE_FAV
} from "./actions";

import { TablesReducerState, Currency } from "./types";

export const initialState: TablesReducerState = {
  loading: false,
  progress: 0,
  tables: []
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_ALL_TABLES:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_TABLES_SUCCESS:
      return {
        ...state,
        loading: false,
        progress: 100
      };
    case GET_ALL_TABLES_FAILURE:
      return {
        ...state,
        loading: false,
        progress: 0
      };
    case GET_TABLE_SUCCESS:
      return {
        ...state,
        tables: [...state.tables, ...action.payload],
        progress: state.progress += action.progress
      };
    case TOGGLE_FAV:
      return {
        ...state,
        tables: state.tables.map((currency: Currency) => {
          if (action.payload.code === currency.code) {
            return {
              ...action.payload,
              isFav: !currency.isFav
            };
          }
          return currency;
        })
      };
    case CLEAR_ALL_FAV:
      return {
        ...state,
        tables: state.tables.map((currency: Currency) => {
          return {
            ...currency,
            isFav: false
          };
        })
      };
    default:
      return state;
  }
}
