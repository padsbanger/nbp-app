import React from "react";
import { connect } from "react-redux";
import { getTables } from "./store/tables/actions";
import { toggleFav, clearAllFav } from "./store/tables/actions";

import "./App.css";

import TablesList from "./TablesList/TablesList";
import FavList from "./FavList/FavList";
import { State } from "./store/combineReducers";
import { Currency } from "./store/tables/types";

interface AppProps {
  getTables: Function;
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
        <div
          style={{
            flex: 1,
            padding: "0 5px",
            overflow: "auto",
            height: "100vh"
          }}
        >
          <h1>
            <span role="img" aria-label="Currency">
              💱
            </span>{" "}
            Currency list
          </h1>
          {loading ? (
            <div id="loading" />
          ) : (
            <TablesList
              tables={tables}
              progress={progress}
              loading={loading}
              toggleFav={toggleFav}
            />
          )}
        </div>
        <div
          style={{ flex: 2, borderLeft: "1px solid #ccc", padding: "0 5px" }}
        >
          <h1>
            <span role="img" aria-label="Favourites">
              ❤️
            </span>{" "}
            Favourites list
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
  toggleFav,
  clearAllFav
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
