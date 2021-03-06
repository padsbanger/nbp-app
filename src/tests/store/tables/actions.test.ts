import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  GET_TABLE,
  GET_TABLE_SUCCESS,
  GET_TABLE_ERROR,
  getTable,
  getTables,
  tables,
  CLEAR_ALL_FAV,
  clearAllFav,
  toggleFav,
  TOGGLE_FAV
} from "../../../store/tables/actions";
import { Currency } from "../../../store/tables/types";

const http = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mockFav: Currency = {
  currency: "Dollar",
  code: "USD",
  mid: 3.14
};

describe("store/tables/actions", () => {
  test("Should return table from single endpoint", async () => {
    const store = mockStore({ auth: { token: "" } });
    http.onGet(`/tables/${tables[0]}`).reply(200, [{ data: [{ rates: [] }] }]);

    await store.dispatch(getTable(tables[0]));
    const actions = store.getActions();

    expect(actions[0].type).toBe(GET_TABLE);
    expect(actions[1].type).toBe(GET_TABLE_SUCCESS);
  });

  test("Should return error if  api call fails ", async () => {
    const store = mockStore({ auth: { token: "" } });
    http.onGet(`/tables/${tables[0]}`).reply(500);

    await store.dispatch(getTable(tables[0]));
    const actions = store.getActions();

    expect(actions[1].type).toBe(GET_TABLE_ERROR);
  });

  test("Should make a api call for every table", async () => {
    const store = mockStore({ auth: { token: "" } });
    http.onGet(new RegExp(`/*`)).reply(200, [{ data: [{ rates: [] }] }]);

    await store.dispatch(getTables());

    const calls = store.getActions().reduce((acc, curr) => {
      return acc + (curr.type === GET_TABLE);
    }, 0);

    expect(calls).toEqual(tables.length);
  });

  test("Should return action with new favourite", async () => {
    const store = mockStore();

    await store.dispatch(toggleFav(mockFav));
    const actions = store.getActions();

    expect(actions[0].type).toBe(TOGGLE_FAV);
  });

  test("Should return action for clearing all favs ", async () => {
    const store = mockStore();

    await store.dispatch(clearAllFav());
    const actions = store.getActions();

    expect(actions[0].type).toBe(CLEAR_ALL_FAV);
  });
});
