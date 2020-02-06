import React from "react";
import Paper from "@material-ui/core/Paper";
import { Currency } from "../store/tables/types";
import TablesListItem from "./TablesListItem";
import TextField from "@material-ui/core/TextField";

interface TablesListProps {
  tables: Currency[];
  toggleFav: Function;
  progress: number;
  loading: Boolean;
}

class FavList extends React.Component<TablesListProps> {
  renderTablesList() {
    const { toggleFav } = this.props;
    return this.props.tables.map((currency: Currency, key) => {
      return (
        <TablesListItem key={key} currency={currency} toggleFav={toggleFav} />
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
