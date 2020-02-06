import {
  GET_TABLE_SUCCESS,
  GET_ALL_TABLES,
  GET_ALL_TABLES_SUCCESS,
  GET_ALL_TABLES_FAILURE
} from "./actions";

import { TablesReducerState } from "./types";

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
        loading: false
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
    default:
      return state;
  }
}
