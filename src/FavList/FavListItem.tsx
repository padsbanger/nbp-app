import React from "react";
import { Currency } from "../store/tables/types";

interface FavListProps {
  currency: Currency;
  toggleFav: Function;
}

export const FavList = (props: FavListProps) => {
  return (
    <li
      style={{
        padding: "3px"
      }}
    >
      [{props.currency.code}] - {props.currency.currency} Price:{" "}
      {props.currency.mid} PLN
      <button
        style={{
          margin: "0 5px"
        }}
        onClick={() => {
          props.toggleFav({
            ...props.currency,
            isFav: props.currency.isFav ? false : true
          });
        }}
      >
        Remove
      </button>
    </li>
  );
};

export default FavList;
