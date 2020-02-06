import { Currency } from "../tables/types";

export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const CLEAR_ALL_FAV = "CLEAR_ALL_FAV";

export function addFav(currency: Currency) {
  return {
    type: ADD_FAV,
    payload: currency
  };
}

export function removeFav(currency: Currency) {
  return {
    type: REMOVE_FAV,
    payload: currency
  };
}

export function clearAllFav() {
  return {
    type: CLEAR_ALL_FAV
  };
}
