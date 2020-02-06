import reducer, { initialState } from "../../../store/tables/reducer";
import {
  GET_TABLE,
  GET_TABLE_SUCCESS,
  GET_TABLE_ERROR,
  getTable,
  getTables,
  tables,
  GET_ALL_TABLES,
  GET_ALL_TABLES_FAILURE,
  GET_ALL_TABLES_SUCCESS
} from "../../../store/tables/actions";
import { Currency, TablesReducerState } from "../../../store/tables/types";

describe("store/tables/reducer", () => {
  const init: TablesReducerState = initialState;

  test("should return initial state if nothing is provided", () => {
    const response = reducer(init, {});

    expect(response).toEqual(init);
  });

  test("Sets loading flag to true", () => {
    const response = reducer(init, { type: GET_ALL_TABLES });

    expect(response.loading).toBe(true);
  });

  test("Sets loading flag to false", () => {
    const response = reducer(
      { ...init, progress: 100 },
      { type: GET_ALL_TABLES_FAILURE }
    );

    expect(response.loading).toBe(false);
    expect(response.progress).toBe(0);
  });

  test("Sets loading flag to false", () => {
    const response = reducer(
      { ...init, progress: 100 },
      { type: GET_ALL_TABLES_SUCCESS }
    );

    expect(response.loading).toBe(false);
    expect(response.progress).toBe(100);
  });

  test("Sets data from single table and increases progress", () => {
    const response = reducer(init, {
      type: GET_TABLE_SUCCESS,
      payload: [],
      progress: 1
    });

    expect(response.progress).toBe(1);
  });
});
