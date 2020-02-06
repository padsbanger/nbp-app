export interface Currency {
  currency: string;
  code: string;
  mid: number;
  isFav?: undefined | Boolean;
}

export interface TablesReducerState {
  loading: Boolean;
  progress: number;
  tables: Currency[];
  fileredTables: Currency[];
}
