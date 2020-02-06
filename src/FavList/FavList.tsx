import React from "react";
import Paper from "@material-ui/core/Paper";

import { Currency } from "../store/tables/types";
import FavListItem from "./FavListItem";

interface FavListProps {
  favourites: Currency[];
}

class FavList extends React.Component<FavListProps> {
  renderTablesList() {
    const { favourites } = this.props;
    return favourites.map((currency: Currency, key) => {
      return <FavListItem key={key} currency={currency} />;
    });
  }

  render() {
    return <Paper>{this.renderTablesList()}</Paper>;
  }
}

export default FavList;
