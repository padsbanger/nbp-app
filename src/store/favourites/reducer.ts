import { ADD_FAV, REMOVE_FAV, CLEAR_ALL_FAV } from "./actions";

import { Currency } from "../tables/types";

export const initialState: Currency[] = [];

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_FAV:
      return [...state, action.payload];
    case REMOVE_FAV:
      return state.filter(
        (currency: Currency) => currency.code !== action.payload.code
      );
    case CLEAR_ALL_FAV:
      return [];
    default:
      return state;
  }
}
