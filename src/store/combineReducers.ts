import { combineReducers } from "redux";
import tablesReducer from "./tables/reducer";
import { TablesReducerState } from "./tables/types";
import { Currency } from "./tables/types";

export default combineReducers({
  tables: tablesReducer
});

export interface State {
  tables: TablesReducerState;
  favourites: Currency[];
}
