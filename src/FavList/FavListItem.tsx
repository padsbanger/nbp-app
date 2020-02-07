import React from "react";
import { Currency } from "../store/tables/types";

interface FavListProps {
  currency: Currency;
  toggleFav: Function;
}

export const FavList = (props: FavListProps) => {
  return (
    <li>
      <span>
        {props.currency.currency} Price: {props.currency.mid} PLN
        <button
          style={{
            margin: "0 5px"
          }}
          onClick={() => {
            props.toggleFav(props.currency);
          }}
        >
          Remove
        </button>
      </span>
    </li>
  );
};

export default FavList;
