import React from "react";
import { Currency } from "../store/tables/types";

interface TablesListItemProps {
  currency: Currency;
  toggleFav: Function;
}

export const TablesListItem = (props: TablesListItemProps) => {
  return (
    <li
      style={{
        padding: "5px"
      }}
      onClick={() => {
        props.toggleFav({
          ...props.currency,
          isFav: props.currency.isFav ? false : true
        });
      }}
    >
      [{props.currency.code}] - {props.currency.currency}{" "}
      {props.currency.isFav ? <span>❤️</span> : ""}
    </li>
  );
};

export default TablesListItem;
