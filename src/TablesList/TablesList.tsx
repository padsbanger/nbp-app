import React from "react";
import Paper from "@material-ui/core/Paper";
import { Currency } from "../store/tables/types";
import TablesListItem from "./TablesListItem";
import TextField from "@material-ui/core/TextField";

interface TablesListProps {
  tables: Currency[];
  addFav: Function;
  removeFav: Function;
  progress: number;
  loading: Boolean;
}

class FavList extends React.Component<TablesListProps> {
  state = {
    search: "",
    filteredList: this.props.tables
  };

  onSearch(value: string) {
    this.setState({
      search: value,
      filteredList: this.props.tables.filter((currency: Currency) => {
        return (
          currency.currency.toLowerCase().search(value.toLowerCase()) !== -1 ||
          currency.code.toLowerCase().search(value.toLowerCase()) !== -1
        );
      })
    });
  }
  renderTablesList() {
    const { filteredList } = this.state;
    const { addFav, removeFav } = this.props;
    return filteredList.map((currency: Currency, key) => {
      return (
        <TablesListItem
          key={key}
          currency={currency}
          toggleFav={currency.isFav ? removeFav : addFav}
        />
      );
    });
  }

  render() {
    return (
      <Paper>
        <TextField
          label="Search currency"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.onSearch(event.target.value);
          }}
          value={this.state.search}
        />
        <br />
        {this.renderTablesList()}
      </Paper>
    );
  }
}

export default FavList;
