import React from "react";
import { Currency } from "../store/tables/types";

interface TablesListItemProps {
  currency: Currency;
  toggleFav: Function;
}

export const TablesListItem = (props: TablesListItemProps) => {
  return (
    <div
      onClick={() => {
        props.toggleFav(props.currency);
      }}
    >
      Currency: {props.currency.code} Price: {props.currency.mid}
    </div>
  );
};

export default TablesListItem;
