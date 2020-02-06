import React from "react";
import { connect } from "react-redux";
import { getTables } from "./store/tables/actions";
import { addFav, removeFav } from "./store/favourites/actions";

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
    const {
      tables,
      progress,
      loading,
      favourites,
      addFav,
      removeFav
    } = this.props;
    return (
      <>
        <h1>Currency list</h1>
        <Grid container justify="center">
          <Grid xs={12} sm={6} item>
            {loading ? null : (
              <TablesList
                tables={tables}
                progress={progress}
                loading={loading}
                addFav={addFav}
                removeFav={removeFav}
              />
            )}
          </Grid>
          <Grid xs={12} sm={6} item>
            <FavList favourites={favourites} />
          </Grid>
        </Grid>
      </>
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
  removeFav
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
