import React from "react";
import { Currency } from "../store/tables/types";

interface TablesListItemProps {
  currency: Currency;
  toggleFav: Function;
}

export const TablesListItem = (props: TablesListItemProps) => {
  return (
    <li
      onClick={() => {
        props.toggleFav(props.currency);
      }}
    >
      <span>
        [{props.currency.code}] - {props.currency.currency}{" "}
        {props.currency.isFav ? (
          <span role="img" aria-label="Favourites">
            ❤️
          </span>
        ) : (
          ""
        )}
      </span>
    </li>
  );
};

export default TablesListItem;
