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
  tables
} from "../../../store/tables/actions";

const http = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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
});
