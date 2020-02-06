import { combineReducers } from "redux";
import tablesReducer from "./tables/reducer";
import favouritesReducer from "./favourites/reducer";
import { TablesReducerState } from "./tables/types";
import { Currency } from "./tables/types";

export default combineReducers({
  tables: tablesReducer,
  favourites: favouritesReducer
});

export interface State {
  tables: TablesReducerState;
  favourites: Currency[];
}
