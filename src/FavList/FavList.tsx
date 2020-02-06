import React from "react";

import { Currency } from "../store/tables/types";
import FavListItem from "./FavListItem";

interface FavListProps {
  favourites: Currency[];
  toggleFav: Function;
}

class FavList extends React.Component<FavListProps> {
  renderTablesList() {
    const { favourites, toggleFav } = this.props;
    return favourites.map((currency: Currency, key) => {
      return (
        <FavListItem key={key} currency={currency} toggleFav={toggleFav} />
      );
    });
  }

  render() {
    return (
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {this.renderTablesList()}
      </ul>
    );
  }
}

export default FavList;
