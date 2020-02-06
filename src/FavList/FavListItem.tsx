import React from "react";
import { Currency } from "../store/tables/types";

interface FavListProps {
  currency: Currency;
}

export const FavList = (props: FavListProps) => {
  return (
    <div>
      Currency: {props.currency.code} Price: {props.currency.mid}
    </div>
  );
};

export default FavList;
