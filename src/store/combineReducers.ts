import { combineReducers } from "redux";
import tables from "./tables/reducer";
import favourites from "./tables/reducer";
import { TablesReducerState } from "./tables/types";
import { Currency } from "./tables/types";

export default () =>
  combineReducers({
    tables,
    favourites
  });

export interface State {
  tables: TablesReducerState;
  favourites: Currency[];
}
