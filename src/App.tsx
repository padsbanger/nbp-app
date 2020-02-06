import React from "react";
import { connect } from "react-redux";
import { getTables } from "./store/tables/actions";
import {
  addFav,
  removeFav,
  toggleFav,
  clearAllFav
} from "./store/favourites/actions";

import "./App.css";

import TablesList from "./TablesList/TablesList";
import FavList from "./FavList/FavList";
import { State } from "./store/combineReducers";
import { Currency } from "./store/tables/types";
import { Grid } from "@material-ui/core";

interface AppProps {
  getTables: Function;
  addFav: Function;
  removeFav: Function;
  toggleFav: Function;
  clearAllFav: Function;
  tables: Currency[];
  progress: number;
  loading: Boolean;
  favourites: Currency[];
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.getTables();
  }

  render() {
    const { tables, progress, loading, favourites, toggleFav } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h1>
            <span>💱</span> Currency list
          </h1>
          {loading ? null : (
            <TablesList
              tables={tables}
              progress={progress}
              loading={loading}
              toggleFav={toggleFav}
            />
          )}
        </div>
        <div style={{ flex: 2 }}>
          <h1>
            <span>❤️</span> Favourites list
            {favourites.length ? (
              <button
                onClick={() => {
                  this.props.clearAllFav();
                }}
              >
                Clear the list
              </button>
            ) : (
              ""
            )}
          </h1>
          <FavList favourites={favourites} toggleFav={toggleFav} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  tables: state.tables.tables,
  favourites: state.tables.tables.filter(
    (currency: Currency) => currency.isFav
  ),
  loading: state.tables.loading,
  progress: state.tables.progress
});

const mapDispatchToProps = {
  getTables,
  addFav,
  removeFav,
  toggleFav,
  clearAllFav
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
