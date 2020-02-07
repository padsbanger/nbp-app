import React from "react";
import { Currency } from "../store/tables/types";
import TablesListItem from "./TablesListItem";

interface TablesListProps {
  tables: Currency[];
  toggleFav: Function;
  progress: number;
  loading: Boolean;
}

class FavList extends React.Component<TablesListProps> {
  renderTablesList() {
    const { toggleFav } = this.props;
    return this.props.tables.map((currency: Currency) => {
      return (
        <TablesListItem
          key={currency.code}
          currency={currency}
          toggleFav={toggleFav}
        />
      );
    });
  }

  render() {
    return <ul>{this.renderTablesList()}</ul>;
  }
}

export default FavList;
