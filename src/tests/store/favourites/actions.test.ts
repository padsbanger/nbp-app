import configureStore from "redux-mock-store";
import {
  ADD_FAV,
  REMOVE_FAV,
  CLEAR_ALL_FAV,
  addFav,
  removeFav,
  clearAllFav
} from "../../../store/favourites/actions";
import { Currency } from "../../../store/tables/types";

const mockStore = configureStore();
const mockFav: Currency = {
  currency: "Dollar",
  code: "USD",
  mid: 3.14
};

describe("store/favourites/actions", () => {
  test("Should return action with new favourite", async () => {
    const store = mockStore();

    await store.dispatch(addFav(mockFav));
    const actions = store.getActions();

    expect(actions[0].type).toBe(ADD_FAV);
  });

  test("Should return action with favourite to remove ", async () => {
    const store = mockStore();

    await store.dispatch(removeFav(mockFav));
    const actions = store.getActions();

    expect(actions[0].type).toBe(REMOVE_FAV);
  });

  test("Should return action for clearing all favs ", async () => {
    const store = mockStore();

    await store.dispatch(clearAllFav());
    const actions = store.getActions();

    expect(actions[0].type).toBe(CLEAR_ALL_FAV);
  });
});
