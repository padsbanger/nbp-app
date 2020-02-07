import reducer, { initialState } from "../../../store/tables/reducer";
import {
  GET_TABLE_SUCCESS,
  GET_ALL_TABLES,
  GET_ALL_TABLES_FAILURE,
  GET_ALL_TABLES_SUCCESS,
  TOGGLE_FAV,
  CLEAR_ALL_FAV
} from "../../../store/tables/actions";
import { Currency, TablesReducerState } from "../../../store/tables/types";

const currencyMock: Currency = {
  code: "USD",
  currency: "Dollar",
  mid: 3.14,
  isFav: false
};

const currencyMock1: Currency = {
  code: "EUR",
  currency: "Euro",
  mid: 5.13,
  isFav: false
};

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

  test("Should mark currency as fav", () => {
    const response = reducer(
      { ...init, tables: [currencyMock, currencyMock1] },
      {
        type: TOGGLE_FAV,
        payload: currencyMock
      }
    );

    expect(response.tables[0].isFav).toBe(true);
    expect(response.tables[1].isFav).toBe(false);
  });

  test("Should clear all fav currency", () => {
    const response = reducer(
      { ...init, tables: [currencyMock, currencyMock1] },
      {
        type: CLEAR_ALL_FAV,
        payload: currencyMock
      }
    );

    expect(response.tables[0].isFav).toBe(false);
    expect(response.tables[1].isFav).toBe(false);
  });
});
